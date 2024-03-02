import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { promisify } from 'util';
import torrentStream from 'torrent-stream';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class TorrentService {
  public engine: any;
  public start: number | null = null;
  public end: number | null = null;
  public hash: string;
  public movieFile: any | null = null;
  public isInit: boolean = false;

  constructor() {}

  isVideo(filePath: string) {
    const videoExtensions = [
      '.mp4',
      '.mov',
      '.avi',
      '.mkv',
      '.wmv',
      '.flv',
      '.webm',
    ];
    const ext = path.extname(filePath).toLowerCase();
    return videoExtensions.includes(ext);
  }

  async init(
    hash: string,
    movie_id: number,
  ): Promise<{ engine: any; movieFile: any }> {
    this.hash = hash;
    this.engine = torrentStream(hash, {
      path: `./movies/${movie_id}`,
      verify: true,
      uploads: 0,
      trackers: [
        'udp://open.demonii.com:1337/announce',
        'udp://tracker.openbittorrent.com:80',
        'udp://tracker.coppersurfer.tk:6969',
        'udp://glotorrents.pw:6969/announce',
        'udp://tracker.opentrackr.org:1337/announce',
        'udp://torrent.gresille.org:80/announce',
        'udp://p4p.arenabg.com:1337',
        'udp://tracker.leechers-paradise.org:6969',
      ],
    });

    return new Promise((resolve, reject) => {
      this.engine.on('idle', () => {
        Logger.log(`${this.movieFile.name} is downloaded`);
      });
      this.engine.on('download', (pieceId) => {
        Logger.log(`Movie piece ${pieceId} downloaded`);
      });
      this.engine.on('destroy', () => {
        Logger.log(`${this.movieFile.name} connections are destroyed`);
      });
      this.engine.on('ready', () => {
        this.engine.files.forEach((file) => {
          if (this.isVideo(file.name)) {
            file.select();
            this.movieFile = file;
          } else {
            file.deselect();
          }
        });
        if (!this.movieFile) {
          reject(new NotFoundException('movie not found'));
        } else {
          resolve({
            engine: this.engine,
            movieFile: this.movieFile,
          });
        }
      });
    });
  }

  createStream(start: number, end: number) {
    if (!this.movieFile) return null;
    const originalExt = path.extname(this.movieFile.name).slice(1);
    const stream = this.movieFile.createReadStream({ start, end });

    if (originalExt !== 'mp4') {
      const mpeg = ffmpeg()
        .input(stream)
        .inputFormat(originalExt)
        .preset('ultrafast')
        .audioCodec('aac')
        .videoCodec('libx264')
        .outputOptions('-movflags frag_keyframe+empty_moov')
        .outputFormat('mp4')
        .on('start', () => {
          Logger.log('Start download ', this.movieFile.name);
        })
        .on('progress', (progress) => {
          Logger.log(`progress: ${progress.timemark}`);
        })
        .on('end', () => {
          Logger.log('Finished processing');
        })
        .on('error', (err) => {
          Logger.error(`ERROR: ${err.message}`);
        });
      return {
        stream: stream,
        mpeg: mpeg,
      };
    } else {
      return {
        stream,
        mpeg: undefined,
      };
    }
  }
}
