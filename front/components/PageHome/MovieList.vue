<script setup lang="ts">
import type { PropType } from "vue";

import DarthVader from "~/assets/icons/darth-vader.svg";
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
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="mx-auto max-w-[1200px] px-4 py-10">
    <h2 class="mb-3 text-3xl font-bold text-primary-400">{{ title }}</h2>

    <div>
      <ul :class="$style.gridContainer">
        <li v-for="(item, idx) in items" :key="idx" class="h-full w-full">
          <MovieThumbnail :item="item" />
        </li>
        <template v-if="loading">
          <li
            v-for="i in 20"
            :key="i"
            class="relative flex h-0 bg-gray-800 pb-[150%]"
            :class="$style.blink"
          >
            <DarthVader
              class="absolute left-1/2 top-1/2 z-10 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2"
            />
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

@keyframes blink-effect {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.9;
  }

  100% {
    opacity: 0.6;
  }
}

.blink {
  animation: blink-effect ease-in-out 2s infinite;
}
</style>
