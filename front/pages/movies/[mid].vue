<script setup lang="ts">
import type { MovieData } from "~/types";

definePageMeta({
  middleware: ["strict-auth"],
});

const axios = useAxios();
const movie = ref<MovieData>({} as MovieData);
const comments = computed(() => []);
const route = useRoute();
const { localeProperties } = useI18n() as any;
const fetching = ref(false);
const openDialog = ref(false);
const videoSource = ref("");
const videoEl = ref<HTMLVideoElement>();

onMounted(async () => {
  try {
    fetching.value = false;
    const { data } = await axios.get("/movies/" + route.params.mid, {
      params: {
        language: localeProperties.value.iso,
      },
    });
    movie.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    fetching.value = false;
  }
});

const playVideo = (torrentHash: string) => {
  videoSource.value = `${useRuntimeConfig().public.BACK_HOST}/movies/${route.params.mid}/stream/${torrentHash}`;
  videoEl.value?.load();
  openDialog.value = true;
};
watch(openDialog, (isOpenDialog: boolean) => {
  if (!isOpenDialog) {
    videoEl.value?.removeAttribute("src");
    videoEl.value?.load();
  }
});
</script>

<template>
  <main class="min-h-[calc(100vh-64px)]">
    <div
      class="mx-auto flex max-w-[1024px] flex-col justify-center gap-10 px-4 pt-[112px] md:flex-row"
    >
      <div class="mx-auto w-full max-w-[400px] md:w-[45%]">
        <div
          v-if="movie.poster_path"
          :style="{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
          }"
          class="h-0 w-full bg-cover bg-no-repeat pb-[150%]"
        ></div>
        <PosterSkeleton v-else />
      </div>

      <section
        :id="movie.imdb_id"
        class="flex w-full flex-col gap-2 p-4 text-xl md:w-[50%]"
      >
        <div class="flex flex-wrap gap-2">
          <p class="font-bold">Title:</p>
          <p class="text-primary-400">{{ movie.title }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <p class="font-bold">Score:</p>
          <p class="text-primary-400">{{ movie.vote_average }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <p>Release Date:</p>
          <p class="text-primary-400">
            {{ new Date(movie.release_date).toLocaleDateString() }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <p>Original language:</p>
          <p class="text-primary-400">
            {{ movie.original_language }}
          </p>
        </div>
        <div class="flex gap-2">
          <p class="font-bold">Genre:</p>
          <p class="inline-flex flex-wrap gap-2">
            <span
              v-for="g in movie.genres"
              :key="g.id"
              class="rounded-[12px] bg-primary-400 px-3 py-1 text-sm font-semibold text-black"
            >
              {{ g.name }}
            </span>
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-bold">Description</p>
          <p class="text-md text-gray-400">
            {{ movie.overview }}
          </p>
        </div>
      </section>
    </div>

    <ul :class="$style.gridContainer" class="mx-auto mt-8 max-w-[960px] px-4">
      <li
        v-for="(torrent, idx) in movie.torrents"
        :key="torrent.url"
        :data-torrent="torrent.url"
        :data-hash="torrent.hash"
        class="mx-auto w-full max-w-[720px] rounded-lg bg-slate-800 px-4 py-3"
      >
        <div class="mb-1 font-extrabold">
          <span class="mr-1 text-primary-300">Torrent {{ idx + 1 }}</span>
          <span class="text-gray-400">
            ({{ torrent.seeds }} seeds, {{ torrent.peers }} peers)
          </span>
        </div>
        <div class="flex justify-between">
          <div class="mt-2 flex gap-2">
            <Badge :size="null" severity="info" :value="torrent.type" />
            <Badge :size="null" severity="danger" :value="torrent.quality" />
          </div>
          <Button
            label="Watch"
            icon="pi pi-youtube"
            @click="playVideo(torrent.hash)"
          />
        </div>
      </li>
    </ul>

    <Dialog
      v-model:visible="openDialog"
      :style="{ width: '95vw', maxWidth: '1024px' }"
      modal
    >
      <video
        ref="videoEl"
        controls
        preload="auto"
        class="w-full"
        :poster="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
      >
        <source :src="videoSource" type="video/mp4" />
      </video>
    </Dialog>

    <CommentList :items="comments" />
  </main>
</template>

<style lang="scss" module>
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  gap: 1rem;
}
</style>
