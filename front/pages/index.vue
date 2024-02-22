<script setup>
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();
const axios = useAxios();
const info = reactive({
  page: 1,
  total_pages: 0,
  total_results: 0,
});

const { localeProperties } = useI18n();
const movies = ref([]);
const fetching = ref(false);

const fetchMovies = async (page, language) => {
  return await axios.get("/movies/", {
    params: {
      page,
      language,
    },
  });
};
onMounted(async () => {
  fetching.value = true;
  const { data } = await fetchMovies(info.page, localeProperties.value.iso);
  const { page, total_pages, total_results, results } = data;
  info.page = page;
  info.total_pages = total_pages;
  info.total_results = total_results;
  movies.value = results;
  fetching.value = false;
});

watch(y, async (scrolledHeight) => {
  if (fetching.value) return;
  if (info.page >= info.total_pages) return;

  const totalScrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  if (totalScrollHeight - scrolledHeight <= 200) {
    info.page += 1;

    fetching.value = true;
    const { data } = await fetchMovies(info.page, localeProperties.value.iso);
    const { page, total_pages, total_results, results } = data;
    info.page = page;
    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = [...movies.value, ...results];
    fetching.value = false;
  }
});
</script>

<template>
  <main class="min-h-[calc(100vh-64px)]">
    <Jumbotron />
    <MovieList :items="movies" :title="$t('Home.Movies.title')" />
  </main>
</template>
