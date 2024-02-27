<script setup lang="ts">
import type { MovieData } from "~/types";

definePageMeta({
  middleware: ["strict-auth"],
});

const axios = useAxios();
const movie = ref<MovieData>({} as MovieData);
const comments = computed(() => []);
const route = useRoute();
const { localeProperties } = useI18n();
const fetching = ref(false);

onMounted(async () => {
  try {
    fetching.value = false;
    const { data } = await axios.get("/movies/" + route.params.mid, {
      params: {
        language: localeProperties.value.iso,
      },
    });
    const { data: commentData } = await axios.get("/comments/", {
      params: {
		movieId:route.params.mid
      },
    });
	console.log('comment data:', commentData)
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
    <div
      class="mx-auto flex max-w-[1024px] flex-col justify-center gap-10 px-4 pt-[112px] md:flex-row"
    >
      <div class="mx-auto w-full max-w-[400px] md:w-[45%]">
        <div
          :style="{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
          }"
          class="h-0 w-full bg-cover bg-no-repeat pb-[150%]"
        ></div>
      </div>

      <section class="flex w-full flex-col gap-2 p-4 text-xl md:w-[50%]">
        <div class="flex flex-wrap gap-2">
          <p class="font-bold">Title:</p>
          <p class="text-primary-400">{{ movie.title }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <p class="font-bold">Score:</p>
          <p class="text-primary-400">{{ movie.vote_average }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <p>Release Date:</p>
          <p class="text-primary-400">
            {{ new Date(movie.release_date).toLocaleDateString() }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <p>Original language:</p>
          <p class="text-primary-400">
            {{ movie.original_language }}
          </p>
        </div>
        <div class="flex gap-2">
          <p class="font-bold">Genre:</p>
          <p class="inline-flex flex-wrap gap-2">
            <span
              v-for="g in movie.genres"
              :key="g.id"
              class="rounded-[12px] bg-primary-400 px-3 py-1 text-sm font-semibold text-black"
            >
              {{ g.name }}
            </span>
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-bold">Description</p>
          <p class="text-md text-gray-400">
            {{ movie.overview }}
          </p>
        </div>
      </section>
    </div>

    <CommentList :items="comments" />
  </main>
</template>
