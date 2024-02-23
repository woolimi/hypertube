export interface UserData {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: boolean;
  accessToken?: string;
  image?: string;
}

export interface MovieData {
  adult: boolean;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // YYYY-MM-DD
  title: string;
  vote_average: number; // 0.0 - 10.0
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  torrents: Array<{
    url: string;
    hash: string;
    quality: string;
    video_codec: string;
    seeds: number;
    peers: number;
    size: string;
    date_uploaded: string;
    type: string;
    audio_channels: string;
    is_repack: string;
  }>;
}

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface GenreType {
  [key: string]: {
    "en-US": string;
    "fr-FR": string;
  };
}
