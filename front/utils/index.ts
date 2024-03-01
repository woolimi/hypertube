import type { GenreType } from "~/types";

export const GENRE: GenreType = {
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

export const range = (
  start: number,
  end: number,
  isReverse: boolean = false,
) => {
  const result = [];
  for (let current = start; current < end; ++current) {
    result.push(current);
  }
  if (isReverse) result.reverse();
  return result;
};
