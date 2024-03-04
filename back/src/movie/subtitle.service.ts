import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import fs from 'fs';
import path from 'path';

@Injectable()
export class SubtitleService {
  private os: AxiosInstance;
  private token: string;
  private exp: Date;

  constructor() {
    this.os = axios.create({
      baseURL: 'https://api.opensubtitles.com/api/v1',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': process.env.OPEN_SUBTITLES_API_KEY,
        'User-Agent': 'hypertube v1.0.0',
      },
      withCredentials: true,
    });
    this.refreshToken();
  }

  async refreshToken() {
    if (this.token && this.exp > new Date()) return this.token;

    Logger.debug('Open Subtitles API refresh token');
    const { data } = await this.os.post('/login', {
      username: process.env.OPEN_SUBTITLES_USER,
      password: process.env.OPEN_SUBTITLES_PASSWORD,
    });
    const curDate = new Date();
    this.token = data.token;
    this.exp = new Date(curDate.setDate(curDate.getDate() + 10));
    return data.token;
  }

  async search(tmdb_id: number) {
    Logger.debug('Open Subtitles API search endpoint');

    const { data } = await this.os.get('/subtitles', {
      params: {
        languages: 'en,fr',
        tmdb_id,
        type: 'movie',
      },
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    const subtitles = data.data;
    const enSub = subtitles.find((d) => d.attributes.language === 'en');
    const frSub = subtitles.find((d) => d.attributes.language === 'fr');

    return [
      {
        file_id: enSub?.attributes.files[0]?.file_id,
        fps: enSub?.attributes.fps,
        language: 'en',
      },
      {
        file_id: frSub?.attributes.files[0]?.file_id,
        fps: frSub?.attributes.fps,
        language: 'fr',
      },
    ];
  }
  checkSubtitle(movie_id: number, file: any) {
    const filePath = `movies/${movie_id}/subtitles/${file.language}.webvtt`;
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      Logger.debug(`Subtitle ${file.language} exists`);
      return true;
    }
    Logger.debug(`Subtitle ${file.language} doesn't exist`);
    return false;
  }

  async createSubtitle(movie_id: number, language: string, link: string) {
    const { data } = await axios.get(link);
    fs.writeFileSync(`movies/${movie_id}/subtitles/${language}.webvtt`, data);
  }

  async download(movie_id: number, file: any) {
    const token = await this.refreshToken();

    if (this.checkSubtitle(movie_id, file)) {
      return;
    }

    Logger.debug('Open Subtitles API download endpoint');
    try {
      const {
        data: { link },
      } = await this.os.post(
        '/download',
        {
          file_id: file.file_id,
          sub_format: 'webvtt',
        },
        {
          baseURL: 'https:/vip-api.opensubtitles.com/api/v1',
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': process.env.OPEN_SUBTITLES_API_KEY,
            'User-Agent': 'hypertube v1.0.0',
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          },
        },
      );
      await this.createSubtitle(movie_id, file.language, link);
    } catch (error) {
      Logger.error(error.response ? error.response : error);
    }
  }
}
