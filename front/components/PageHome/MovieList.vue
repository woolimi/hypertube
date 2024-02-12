<script setup>
// TODO: Add infinite scroll
// TODO: Different Thumbnail for watched movies
const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <section class="mx-auto max-w-[960px] px-4 py-10">
    <h2 class="mb-3 text-3xl font-bold text-primary-400">Movies</h2>

    <ul :class="$style.gridContainer">
      <li v-for="item in items" class="h-full w-full">
        <MovieThumbnail :item="item" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" module>
.gridContainer {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
}
</style>
