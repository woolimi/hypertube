<script setup lang="ts">
const SORT_BUTTON_LIST = ["popularity", "title", "primary_release_date"];

const { sortIcon, toggleSort } = useMovies();
</script>

<template>
  <div class="mx-auto flex max-w-[1200px] translate-y-16 justify-end gap-2">
    <Button
      v-for="(target, idx) in SORT_BUTTON_LIST"
      :key="target + idx"
      class="h-[30px]"
      :label="$t('Sort.' + target)"
      :icon="sortIcon(target)"
      icon-pos="left"
      text
      @click="toggleSort(target)"
    />
  </div>
</template>
