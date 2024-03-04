<script setup lang="ts">
import defaultPhoto from "assets/images/no_image.jpg";
import type { PropType } from "vue";

import type { MovieData } from "~/types";

const localePath = useLocalePath();
defineProps({
  item: {
    type: Object as PropType<MovieData>,
    default: () => ({}),
  },
  height: {
    type: String,
    default: "420px",
  },
});
const onErrorImageLoad = (event: Event) => {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = defaultPhoto;
};
</script>

<template>
  <NuxtLink
    :to="localePath({ name: 'movies-mid', params: { mid: item.id } })"
    class="relative block h-full"
    :class="$style.link"
  >
    <div
      :class="$style.overlay"
      class="flex h-full flex-col items-center justify-center p-4"
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

    <div
      v-if="item.is_watched"
      class="absolute left-[10px] top-[10px] flex items-center gap-2 text-gray-300"
    >
      <i class="pi pi-check text-xl"></i>
      {{ $t("Home.Movies.watched") }}
    </div>

    <figure class="h-full w-full">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
        class="w-full max-w-[280px] object-cover"
        :style="{ height }"
        @error="onErrorImageLoad"
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
