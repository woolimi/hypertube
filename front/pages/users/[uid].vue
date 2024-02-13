<script setup>
const route = useRoute();
const { data } = await useAsyncData(`users-${route.params.uid}`, async () => {
  return {
    uid: route.params.uid,
    image: "https://i.pravatar.cc/300?u=wpark",
    username: "wpark",
    firstName: "woolim",
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
  <main class="min-h-[calc(100vh-64px)] px-4">
    <section
      class="mx-auto mb-10 flex max-w-[760px] flex-col items-center justify-center gap-2 pt-[112px]"
    >
      <img
        :src="data.image"
        class="h-[150px] w-[150px] rounded-[50%] border-4 border-primary-400"
      />
      <h1 class="text-center text-2xl font-extrabold text-primary-400">
        {{ data.username }}
      </h1>
    </section>

    <section class="flex gap-5">
      <Card>
        <template #title
          ><h2 class="text-primary-400">Profile information</h2></template
        >
        <template #content>
          <ul>
            <li>Firstname: {{ data.firstName }}</li>
            <li>Firstname: {{ data.firstName }}</li>
          </ul>
        </template>
      </Card>

      <Card>
        <template #title>Comments</template>
        <template #content>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </template>
      </Card>
    </section>
  </main>
</template>
