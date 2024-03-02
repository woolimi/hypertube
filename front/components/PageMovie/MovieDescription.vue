<script setup lang="ts">
import type { MovieData } from "~/types";

defineProps({
  movie: {
    type: Object as PropType<MovieData>,
    required: true,
  },
});
</script>
<template>
  <div
    class="flex h-full flex-col gap-2 rounded-lg bg-surface-900 p-4 text-xl sm:p-8"
  >
    <div class="flex flex-wrap gap-3">
      <p class="font-bold">{{ $t("Movie.Description.Title") }}</p>
      <p class="text-primary-400">{{ movie.title }}</p>
    </div>
    <div class="flex flex-wrap gap-3">
      <p class="font-bold">{{ $t("Movie.Description.Score") }}</p>
      <p class="text-primary-400">
        {{ movie.vote_average }}
        <i class="pi pi-star-fill text-sm text-primary-300"> </i>
      </p>
    </div>
    <div class="flex flex-wrap gap-3">
      <p>{{ $t("Movie.Description.ReleaseDate") }}</p>
      <p class="text-primary-400">
        {{ new Date(movie.release_date).toLocaleDateString() }}
      </p>
    </div>
    <div class="flex flex-wrap gap-3">
      <p>{{ $t("Movie.Description.Language") }}</p>
      <p class="text-primary-400">
        {{ movie.original_language }}
      </p>
    </div>
    <div class="flex gap-3">
      <p class="font-bold">{{ $t("Movie.Description.Genres") }}</p>
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
      <p class="font-bold">{{ $t("Movie.Description.Overview") }}</p>
      <p class="text-md text-gray-400">
        {{ movie.overview }}
      </p>
    </div>
  </div>
</template>
