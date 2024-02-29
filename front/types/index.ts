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
}

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  User: UserData;
}
