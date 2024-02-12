<script setup>
const { data } = await useAsyncData("mountains", async () => {
  // TODO: get movie by mid
  // TODO: get comments by mid
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
      <figure>
        <img :src="movie.image" />
        <figcaption>
          {{ movie.title }}
        </figcaption>
      </figure>
    </section>

    <section>
      <!-- movie information -->
    </section>

    <CommentList :items="comments" />
  </main>
</template>
