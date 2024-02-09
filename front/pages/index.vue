<script setup>
import { pipe, range, map, toArray } from "@fxts/core";

const movies = ref(
  pipe(
    range(20),
    map((_) => ({
      image: "/thumbnail.jpeg",
      title: "Don't look up",
      description:
        "Deux astronomes méconnus entreprennent une tournée médiatique pour prévenir l'humanité qu'une comète fonce sur la Terre. Mais cela n'a pas l'air d'inquiéter grand monde.",
      genre: ["SF", "Comedies", "Drames sociaux"],
      score: 4.5,
    })),
    toArray,
  ),
);
</script>

<template>
  <main class="min-h-[calc(100vh-64px)]">
    <Jumbotron />
    <MovieList :items="movies" />
  </main>
</template>
