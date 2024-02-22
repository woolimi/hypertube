<script setup lang="ts">
import type { PropType } from "vue";

import type { MovieData } from "~/types";

// TODO: Add infinite scroll
defineProps({
  items: {
    type: Array as PropType<MovieData[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <section class="mx-auto max-w-[960px] px-4 py-10">
    <h2 class="mb-3 text-3xl font-bold text-primary-400">{{ title }}</h2>

    <ul :class="$style.gridContainer">
      <li v-for="(item, idx) in items" :key="idx" class="h-full w-full">
        <MovieThumbnail :item="item" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" module>
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  gap: 1rem;
}
</style>
