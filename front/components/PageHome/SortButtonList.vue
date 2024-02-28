<script setup lang="ts">
import type { MovieData } from "~/types";
const SORT_BUTTON_LIST = [
  "popularity",
  "title",
  "release_date",
  "vote_average",
];

const { sortIcon, toggleSort } = useMovies();
</script>

<template>
  <div class="flex gap-2">
    <Button
      v-for="(target, idx) in SORT_BUTTON_LIST"
      :key="target + idx"
      class="h-[30px]"
      :label="$t('Sort.' + target)"
      :icon="sortIcon(target)"
      icon-pos="left"
      text
      @click="toggleSort(target as keyof MovieData)"
    />
  </div>
</template>
