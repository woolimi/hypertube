<script setup lang="ts">
import type { PropType } from "vue";

import type { MovieData } from "~/types";

const localePath = useLocalePath();
defineProps({
  item: {
    type: Object as PropType<MovieData>,
    default: () => ({}),
  },
});
</script>

<template>
  <NuxtLink
    :to="localePath({ name: 'movies-mid', params: { mid: item.id } })"
    class="relative block"
    :class="$style.link"
  >
    <div
      :class="$style.overlay"
      class="flex flex-col items-center justify-center p-4"
    >
      <p class="text-center text-2xl font-extrabold">{{ item.title }}</p>
      <p class="flex items-center gap-1">
        <i class="pi pi-star-fill text-sm text-primary-300"> </i>
        <span class="translate-y-[1px]">{{ item.vote_average }}</span>
      </p>
      <ul class="mt-5 flex flex-wrap justify-center gap-1">
        <li
          v-for="genre in item.genres"
          :key="genre.id"
          class="rounded-[12px] bg-primary-500 px-2 py-1 text-xs font-bold text-black"
        >
          {{ genre.name }}
        </li>
      </ul>
    </div>

    <figure class="w-full">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
        class="w-full object-cover"
      />
    </figure>
  </NuxtLink>
</template>

<style lang="scss" module>
.overlay {
  @apply bg-black bg-opacity-50 transition-all duration-300;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.link:hover {
  .overlay {
    opacity: 100;
  }
}
</style>
