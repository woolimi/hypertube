<script setup>
const axios = useAxios();
const info = reactive({
  page: 1,
  total_pages: 0,
  total_results: 0,
});

const { localeProperties } = useI18n();
const movies = ref([]);

onMounted(async () => {
  const { data } = await axios.get("/movies/", {
    params: {
      page: info.page,
      language: localeProperties.value.iso,
    },
  });
  const { page, total_pages, total_results, results } = data;
  info.page = page;
  info.total_pages = total_pages;
  info.total_results = total_results;
  movies.value = results;
});
</script>

<template>
  <main class="min-h-[calc(100vh-64px)]">
    <Jumbotron />
    <MovieList :items="movies" :title="$t('Home.Movies.title')" />
  </main>
</template>
