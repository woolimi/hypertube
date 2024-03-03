<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";

import type { MovieData } from "~/types";

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
});
const axios = useAxios();
const watchedMovies = ref<Array<MovieData>>([]);
const { localeProperties } = useI18n();
const pagination = reactive({
  page: 0,
  total: 1,
  perPage: 5,
});
const { y } = useWindowScroll();

const fetching = ref(true);
const fetchList = async () => {
  if (pagination.page !== 0 && fetching.value) return;

  try {
    fetching.value = true;
    pagination.page = pagination.page + 1;
    const { data } = await axios.get(`/users/${props.uid}/watched-movies`, {
      params: {
        page: pagination.page,
        language: localeProperties.value.iso,
      },
    });
    watchedMovies.value = [...watchedMovies.value, ...data.movies];
  } catch (error) {
    console.error(error);
  } finally {
    fetching.value = false;
  }
};

onMounted(() => fetchList());

watch(y, async (scrolledHeight: number) => {
  if (pagination.page >= pagination.total) return;

  const totalScrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  if (totalScrollHeight - scrolledHeight <= 200) {
    await fetchList();
  }
});
</script>
<template>
  <section class="col-span-1 mt-5 md:col-span-2">
    <div class="relative">
      <hr class="border-primary-300" />
      <h2
        class="absolute left-1/2 top-1/2 z-10 mb-4 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-center text-4xl font-bold text-primary-400"
      >
        {{ $t("Profile.WatchedList.title") }}
      </h2>
    </div>

    <div class="py-20">
      <ul
        v-if="watchedMovies.length"
        class="flex flex-wrap justify-center gap-4"
      >
        <li v-for="item in watchedMovies" :key="item.id" class="w-[200px]">
          <MovieThumbnail :item="item" />
        </li>
      </ul>
      <div v-else-if="fetching" class="flex justify-center">
        <ProgressSpinner
          style="width: 100px; height: 100px"
          stroke-width="8"
          animation-duration=".1s"
        />
      </div>
      <p v-else class="text-center text-xl">
        {{ $t("Profile.WatchedList.noList") }}
      </p>
    </div>
  </section>
</template>
