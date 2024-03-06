<script setup lang="ts">
import type { MovieData } from "~/types";

defineProps({
  movie: {
    type: Object as PropType<MovieData>,
    default: () => ({}),
  },
});
const OFFSET = 0.5;
const sync = ref(0);
const route = useRoute();
const openDialog = ref(false);
const videoSource = ref("");
const videoEl = ref<HTMLVideoElement>();
const { locale } = useI18n();
const axios = useAxios();

const playVideo = async (torrentHash: string) => {
  await axios.post(`/movies/${route.params.mid}/subtitles`);

  videoSource.value = `${useRuntimeConfig().public.BACK_HOST}/movies/${route.params.mid}/stream/${torrentHash}`;
  videoEl.value?.load();
  openDialog.value = true;
};

const adjustSubtitle = (isAdd: boolean) => {
  if (videoEl.value) {
    sync.value += isAdd ? OFFSET : -OFFSET;
    console.log("sync: ", sync.value);
    Array.from(videoEl.value.textTracks as TextTrackList).forEach(
      (track: TextTrack) => {
        if (track.mode === "showing") {
          Array.from(track.cues as TextTrackCueList).forEach(
            (cue: TextTrackCue) => {
              cue.startTime += isAdd ? OFFSET : -OFFSET;
              cue.endTime += isAdd ? OFFSET : -OFFSET;
            },
          );
          return true;
        }
      },
    );
  }
  return false;
};

watch(openDialog, (isOpenDialog: boolean) => {
  if (!isOpenDialog) {
    videoEl.value?.removeAttribute("src");
    videoEl.value?.load();
  }
});

const backHost = useRuntimeConfig().public.BACK_HOST;
</script>

<template>
  <div class="mx-auto mt-8 max-w-[960px] px-4">
    <ul :class="$style.gridContainer">
      <li
        v-for="(torrent, idx) in movie.torrents"
        :key="torrent.url"
        :data-torrent="torrent.url"
        :data-hash="torrent.hash"
        class="mx-auto w-full rounded-lg bg-slate-800 px-4 py-3"
      >
        <div class="mb-1 font-extrabold">
          <span class="mr-1 text-primary-300">Torrent {{ idx + 1 }}</span>
          <span class="text-gray-400">
            ({{ torrent.seeds }} seeds, {{ torrent.peers }} peers)
          </span>
        </div>
        <div class="flex justify-between">
          <div class="mt-2 flex gap-2">
            <span
              class="flex items-center rounded-[18px] bg-blue-800 px-3 py-1 text-sm"
            >
              {{ torrent.type }}
            </span>
            <span
              class="flex items-center rounded-[18px] bg-red-800 px-3 py-1 text-sm"
            >
              {{ torrent.quality }}
            </span>
          </div>

          <Button
            :label="$t('Movie.Description.Watch')"
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
        crossorigin="use-credentials"
      >
        <source :src="videoSource" type="video/mp4" />
        <track
          :default="locale !== 'en'"
          label="English"
          kind="subtitles"
          srclang="en"
          :src="`${backHost}/movies/${route.params.mid}/subtitles/en.webvtt`"
        />
        <track
          :default="locale !== 'fr'"
          label="Français"
          kind="subtitles"
          srclang="fr"
          :src="`${backHost}/movies/${route.params.mid}/subtitles/fr.webvtt`"
        />
      </video>
      <div class="mt-5 flex items-center justify-end gap-5">
        <div class="text-2xl text-primary-300">sync: {{ sync }}s</div>
        <div class="flex gap-2">
          <Button
            icon="pi pi-plus"
            severity="secondary"
            @click="adjustSubtitle(true)"
          />
          <Button
            size="small"
            icon="pi pi-minus"
            severity="secondary"
            @click="adjustSubtitle(false)"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style module lang="scss">
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, auto));
  gap: 1rem;

  @media screen and (width >= 540px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  }
}
</style>
