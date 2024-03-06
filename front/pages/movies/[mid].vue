<script setup lang="ts">
import defaultPhoto from "assets/images/no_image.jpg";

import type { MovieData } from "~/types";

definePageMeta({
  middleware: ["strict-auth"],
});

const axios = useAxios();
const movie = ref<MovieData>({} as MovieData);
const route = useRoute();
const { localeProperties } = useI18n() as any;
const fetching = ref(true);
const localePath = useLocalePath();

onMounted(async () => {
  try {
    fetching.value = true;
    const { data } = await axios.get("/movies/" + route.params.mid, {
      params: {
        language: localeProperties.value.iso,
      },
    });
    movie.value = data;
  } catch (error: any) {
    navigateTo({ path: localePath("404") });
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
        <PosterSkeleton v-if="fetching" />
        <div
          v-else-if="movie.poster_path"
          :style="{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
          }"
          class="h-0 w-full bg-cover bg-no-repeat pb-[150%]"
        ></div>
        <div
          v-else
          class="h-0 w-full bg-cover bg-center bg-no-repeat pb-[150%]"
          :style="{
            backgroundImage: `url(${defaultPhoto})`,
          }"
        ></div>
      </div>

      <div class="w-full md:w-[50%]">
        <MovieDescription v-if="movie.title" :movie="movie" />
        <MovieDescSkeleton v-else />
      </div>
    </section>

    <section>
      <TorrentListSkeleton v-if="fetching" />
      <div
        v-else-if="!movie.torrents?.length"
        class="mb-10 pt-20 text-center text-2xl text-white"
      >
        {{ $t("Movie.Torrents.none") }}
      </div>
      <TorrentList v-else :movie="movie" />
    </section>

    <CommentList :mid="route.params.mid" />
  </main>
</template>
