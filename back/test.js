import torrentStream from 'torrent-stream';
import { remote, toMagnetURI, toTorrentFile } from 'parse-torrent';
import { promisify } from 'util';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

const isVideoFile = (filePath) => {
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
};
const remoteAsync = promisify(remote);

const data = await remoteAsync(
  'https://yts.mx/torrent/download/90C8B5237474838C14E1759588B9A505F96BC6F1',
  { timeout: 60 * 1000 },
);

const filename = data.files.find((file) => isVideoFile(file.path))?.path;
console.log(file);

const engine = torrentStream(data, {
  tmp: './movies',
  verify: true,
});
const realExtension = path.extname(filename).slice(1);

engine.on('ready', async () => {
  engine.files.forEach(async (file) => {
    if (file.name === filename) {
      console.log('-----file selected for streaming-----');
      file.select();
      const stream = file.createReadStream();
      if (realExtension === 'mp4' || realExtension === 'mkv') {
        pump(stream, res);
      } else {
        ffmpeg()
          .input(stream)
          .outputOptions('-movflags frag_keyframe+empty_moov')
          .outputFormat('mp4')
          .on('start', () => {
            console.log('start');
          })
          .on('progress', (progress) => {
            console.log(`progress: ${progress.timemark}`);
          })
          .on('end', () => {
            console.log('Finished processing');
          })
          .on('error', (err) => {
            console.log(`ERROR: ${err.message}`);
          })
          .inputFormat(realExtension)
          .audioCodec('aac')
          .videoCodec('libx264')
          .pipe(res);
        res.on('close', () => {
          stream.destroy();
        });
      }
    } else {
      console.log('-----file with wrong extension-----');
    }
  });
});
