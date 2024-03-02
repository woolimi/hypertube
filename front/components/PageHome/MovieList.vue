<script setup lang="ts">
const { filteredMovies } = useMovies();

defineProps({
  title: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="mx-auto max-w-[1200px] px-4 py-10">
    <div
      class="mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-end"
    >
      <h2 class="min-w-[190px] text-5xl font-bold text-primary-400">
        {{ title }}
      </h2>
      <div class="w-full">
        <FilterList />
        <SortButtonList />
      </div>
    </div>
    <div>
      <ul :class="$style.gridContainer">
        <li
          v-for="(item, idx) in filteredMovies"
          :key="idx"
          class="h-full w-full"
        >
          <MovieThumbnail :item="item" />
        </li>
        <template v-if="loading">
          <li v-for="i in 20" :key="i">
            <PosterSkeleton />
          </li>
        </template>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" module>
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, auto));
  gap: 1rem;
}
</style>
