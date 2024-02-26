<script setup lang="ts">
const { fetching, movies, sortIcon, toggleSort, searchMovies } = useMovies();
const SORT_BUTTON_LIST = ["popularity", "title", "primary_release_date"];

const search = ref("");
</script>

<template>
  <main class="min-h-[calc(100vh-64px)]">
    <Jumbotron />
    <form
      class="flex justify-end gap-2"
      @submit.prevent="searchMovies(search, () => (search = ''))"
    >
      <BaseInput v-model="search" />
      <Button type="submit" :label="$t('Home.Search.label')" />
    </form>
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
    <!-- <SortButtonList /> -->
    <MovieList
      :items="movies"
      :title="$t('Home.Movies.title')"
      :loading="fetching"
    />
  </main>
</template>
