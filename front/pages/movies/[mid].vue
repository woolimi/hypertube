<script setup lang="ts">
import type { MovieData } from "~/types";

definePageMeta({
  middleware: ["strict-auth"],
});

const axios = useAxios();
const movie = ref<MovieData>({} as MovieData);
const comments = computed(() => []);
const route = useRoute();
const { localeProperties } = useI18n() as any;
const fetching = ref(false);

onMounted(async () => {
  try {
    fetching.value = false;
    const { data } = await axios.get("/movies/" + route.params.mid, {
      params: {
        language: localeProperties.value.iso,
      },
    });
    movie.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    fetching.value = false;
  }
});
</script>

<template>
  <main class="min-h-[calc(100vh-64px)]">
    <section
      class="mx-auto flex max-w-[1024px] flex-col items-center justify-around gap-10 px-4 pt-[112px] md:flex-row"
    >
      <div
        class="mx-auto w-full max-w-[400px] md:mx-[none] md:w-[45%] md:min-w-[320px]"
      >
        <div
          v-if="movie.poster_path"
          :style="{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
          }"
          class="h-0 w-full bg-cover bg-no-repeat pb-[150%]"
        ></div>
        <PosterSkeleton v-else />
      </div>

      <div class="w-full md:w-[50%]">
        <MovieDescription v-if="movie.title" :movie="movie" />
        <MovieDescSkeleton v-else />
      </div>
    </section>

    <section>
      <TorrentList v-if="movie.torrents" :movie="movie" />
      <TorrentListSkeleton v-else />
    </section>

    <CommentList :items="comments" />
  </main>
</template>
