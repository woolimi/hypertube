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

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface GenreType {
  [key: string]: {
    "en-US": string;
    "fr-FR": string;
  };
}

export const Genre: GenreType = {
  "12": {
    "en-US": "Adventure",
    "fr-FR": "Aventure",
  },
  "14": {
    "en-US": "Fantasy",
    "fr-FR": "Fantastique",
  },
  "16": {
    "en-US": "Animation",
    "fr-FR": "Animation",
  },
  "18": {
    "en-US": "Drama",
    "fr-FR": "Drame",
  },
  "27": { "en-US": "Horror", "fr-FR": "Horreur" },
  "28": {
    "en-US": "Action",
    "fr-FR": "Action",
  },
  "35": {
    "en-US": "Comedy",
    "fr-FR": "Comédie",
  },
  "36": {
    "en-US": "History",
    "fr-FR": "Histoire",
  },
  "37": {
    "en-US": "Western",
    "fr-FR": "Western",
  },
  "53": {
    "en-US": "Thriller",
    "fr-FR": "Thriller",
  },
  "80": {
    "en-US": "Crime",
    "fr-FR": "Crime",
  },
  "99": {
    "en-US": "Documentary",
    "fr-FR": "Documentaire",
  },
  "878": {
    "en-US": "Science Fiction",
    "fr-FR": "Science-fiction",
  },
  "9648": {
    "en-US": "Mystery",
    "fr-FR": "Mystère",
  },
  "10402": {
    "en-US": "Music",
    "fr-FR": "Musique",
  },
  "10749": {
    "en-US": "Romance",
    "fr-FR": "Romance",
  },
  "10751": {
    "en-US": "Family",
    "fr-FR": "Familial",
  },
  "10752": {
    "en-US": "War",
    "fr-FR": "Guerre",
  },
  "10770": {
    "en-US": "TV Movie",
    "fr-FR": "Téléfilm",
  },
};

export const getYears = () => {
  const startYear = 1950;
  const years = [];
  const currentYear = new Date().getUTCFullYear();

  for (let year = currentYear; year >= startYear; --year) {
    years.push(String(year));
  }

  return years;
};

export const getVoteAverages = () => {
  const maxVoteAverage = 9;
  const votes = [];

  for (let voteAverage = maxVoteAverage; voteAverage > 0; --voteAverage) {
    votes.push(voteAverage);
  }
  return votes;
};
