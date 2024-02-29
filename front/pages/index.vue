<script setup lang="ts">
const { fetching } = useMovies();
</script>

<template>
  <main class="min-h-[calc(100vh-64px)]">
    <Jumbotron />
    <MovieList :title="$t('Home.Movies.title')" :loading="fetching" />
  </main>
</template>
