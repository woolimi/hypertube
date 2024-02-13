<script setup>
const route = useRoute();
const { data } = await useAsyncData(`users-${route.params.uid}`, async () => {
  return {
    uid: route.params.uid,
    image: "https://i.pravatar.cc/300?u=wpark",
    username: "wpark",
    firstName: "Woolim",
    lastName: "Park",
    watchedList: [
      {
        image: "/thumbnail.jpeg",
        title: "Don't look up",
        description:
          "Deux astronomes méconnus entreprennent une tournée médiatique pour prévenir l'humanité qu'une comète fonce sur la Terre. Mais cela n'a pas l'air d'inquiéter grand monde.",
        genre: ["SF", "Comedies", "Drames sociaux"],
        score: 4.5,
        mid: 12345,
        year: 2022,
      },
    ],
  };
});
</script>

<template>
  <main
    class="mx-auto min-h-[calc(100vh-64px)] max-w-[760px] px-4 pb-10 pt-[112px]"
  >
    <section
      class="mx-auto mb-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10"
    >
      <div class="shrink-0">
        <img
          :src="data.image"
          class="h-[150px] w-[150px] rounded-[50%] border-4 border-primary-400"
        />
        <h1 class="text-center text-2xl font-extrabold text-primary-400">
          {{ data.username }}
        </h1>
      </div>

      <div class="w-full rounded-lg bg-surface-900">
        <div
          class="flex items-center gap-2 rounded-t-lg bg-surface-800 px-4 py-2 text-primary-400"
        >
          <i class="pi pi-id-card text-3xl"></i>
          <h2 class="text-2xl font-extrabold">Profile</h2>
        </div>
        <ul class="flex flex-col gap-2 p-4 text-xl text-white">
          <li class="flex justify-between">
            <span class="text-primary-400">First name</span>
            <span>
              {{ data.firstName }}
            </span>
          </li>
          <li class="flex justify-between">
            <span class="text-primary-400">Last name</span>
            <span>
              {{ data.lastName }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <MovieList :items="data.watchedList" title="Watched List" />
    </section>
  </main>
</template>
