import { ApiProperty, PickType } from '@nestjs/swagger';
import { MovieResponseDto } from './movie-response.dto';

export class MovieTorrentDto extends PickType(MovieResponseDto, [
  'id',
  'adult',
  'backdrop_path',
  'genre_ids',
  'original_language',
  'original_title',
  'overview',
  'popularity',
  'poster_path',
  'release_date',
  'title',
  'vote_average',
  'vote_count',
]) {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  is_watched: boolean;
  genres: Array<{ id: number; name: string }>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  @ApiProperty({
    description: 'Torrents',
    example: {
      url: 'https://yts.mx/torrent/download/36DBE5857EC8352361F2E15D889BB78D20E70BEB',
      hash: '36DBE5857EC8352361F2E15D889BB78D20E70BEB',
      quality: '720p',
      type: 'bluray',
      is_repack: '0',
      video_codec: 'x264',
      bit_depth: '8',
      audio_channels: '2.0',
      seeds: '3',
      peers: '0',
      size: '1.07 GB',
      size_bytes: 1148903752,
      date_uploaded: '2023-07-12 01:44:44',
      date_uploaded_unix: 1689119084,
    },
  })
  torrents: Array<{
    url: string;
    hash: string;
    quality: string;
    type: string;
    is_repack: string;
    video_codec: string;
    bit_depth: string;
    audio_channels: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
  }>;
}
