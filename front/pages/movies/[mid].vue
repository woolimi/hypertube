<script setup>

definePageMeta({
  middleware: ['strict-auth']
})

const { data } = await useAsyncData("mountains", async () => {
  // TODO: get movie by mid
  // TODO: get comments by mid
  // TODO: Different Thumbnail for watched movie

  return {
    movie: {
      image: "/thumbnail.jpeg",
      title: "Don't look up",
      description:
        "Deux astronomes méconnus entreprennent une tournée médiatique pour prévenir l'humanité qu'une comète fonce sur la Terre. Mais cela n'a pas l'air d'inquiéter grand monde.",
      genre: ["SF", "Comedies", "Drames sociaux"],
      score: 4.5,
      mid: 12345,
      year: 2022,
    },
    comments: [
      {
        cid: 1,
        username: "wpark",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, eius ab. Voluptatum nobis quam dicta alias facere, vitae impedit cum quasi voluptatibus eveniet dignissimos eum adipisci enim quisquam error ratione?",
        avatar: "https://i.pravatar.cc/300?u=wpark",
      },
      {
        cid: 2,
        username: "sucho",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, eius ab. Voluptatum nobis quam dicta alias facere, vitae impedit cum quasi voluptatibus eveniet dignissimos eum adipisci enim quisquam error ratione?",
        avatar: "https://i.pravatar.cc/300?u=sucho",
        comments: [
          {
            cid: 3,
            username: "kychoi",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, eius ab. Voluptatum nobis quam dicta alias facere, vitae impedit cum quasi voluptatibus eveniet dignissimos eum adipisci enim quisquam error ratione?",
            avatar: "https://i.pravatar.cc/300?u=kychoi",
          },
        ],
      },
      {
        cid: 4,
        username: "cjung-mo",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, eius ab. Voluptatum nobis quam dicta alias facere, vitae impedit cum quasi voluptatibus eveniet dignissimos eum adipisci enim quisquam error ratione?Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, eius ab. Voluptatum nobis quam dicta alias facere, vitae impedit cum quasi voluptatibus eveniet dignissimos eum adipisci enim quisquam error ratione?",
        avatar: "https://i.pravatar.cc/300?u=cjung-mo",
      },
    ],
  };
});
const movie = computed(() => data.value?.movie ?? {});
const comments = computed(() => data.value?.comments ?? []);
</script>

<template>
  <main class="min-h-[calc(100vh-64px)]">
    <section class="mx-auto max-w-[760px] pt-[112px]">
      <img :src="movie.image" class="h-full w-full object-cover" />
    </section>

    <section class="mx-auto max-w-[760px] p-4">
      <ul class="flex flex-col gap-2 text-xl">
        <li>
          <span class="font-bold"> Title: </span>
          <span class="text-primary-400">{{ movie.title }}</span>
        </li>
        <li>
          <span class="font-bold"> Score: </span>
          <span class="text-primary-400">{{ movie.score }}</span>
        </li>
        <li>
          <span class="font-bold"> Genre: </span>
          <p class="inline-flex flex-wrap gap-1">
            <span
              v-for="g in movie.genre"
              :key="g"
              class="rounded-[12px] bg-primary-400 px-3 py-1 text-sm font-semibold text-black"
            >
              {{ g }}
            </span>
          </p>
        </li>
        <li>
          <p class="font-bold">Description</p>
          <p class="text-gray-400">
            {{ movie.description }}
          </p>
        </li>
      </ul>
    </section>

    <CommentList :items="comments" />
  </main>
</template>
