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
const fetching = ref(true);

const state = ref(0); // 0 for NONE, 1 for DESC, 2 for ASC
// const states = ["NONE", "DESC", "ASC"];
const sortIcons = ["", "pi-arrow-down", "pi-arrow-up"];

const toggleState = () => {
  state.value = (state.value + 1) % 3;
};

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
    <Button
      class="--tw-text-white h-[30px] bg-gray-300"
      :label="$t('Sort.title')"
      :icon="`pi ${sortIcons[state]}`"
      icon-pos="left"
      text
      @click="toggleState"
    />
    <MovieList
      :items="movies"
      :title="$t('Home.Movies.title')"
      :loading="fetching"
    />
  </main>
</template>
