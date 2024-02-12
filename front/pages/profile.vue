<script setup>
import { range, map, pipe, toArray } from "@fxts/core";
import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

const email = ref("wpark@student.42.fr");
const username = ref("wpark");
const firstName = ref("Woo");
const lastName = ref("Park");
const avatar = ref("https://i.pravatar.cc/300?u=wpark");
const password = ref("");
const watchedMovies = ref(
  pipe(
    range(20),
    map((_) => ({
      image: "/thumbnail.jpeg",
      title: "Don't look up",
      description:
        "Deux astronomes méconnus entreprennent une tournée médiatique pour prévenir l'humanité qu'une comète fonce sur la Terre. Mais cela n'a pas l'air d'inquiéter grand monde.",
      genre: ["SF", "Comedies", "Drames sociaux"],
      score: 4.5,
      mid: 12345,
    })),
    toArray,
  ),
);
const modules = [FreeMode, Pagination];
</script>
<template>
  <main class="min-h-[calc(100vh-64px)] px-4 pb-20 pt-[112px] md:px-8">
    <div class="mx-auto flex max-w-[540px] flex-col flex-wrap gap-10">
      <section>
        <h2 class="text-3xl font-bold text-primary-400">Profile</h2>
        <div class="mx-auto flex gap-10 rounded-lg bg-surface-900 p-4">
          <Avatar
            :image="avatar"
            size="xlarge"
            shape="circle"
            class="overflow-hidden"
          />
          <aside class="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
            <BaseInput
              label="Username"
              v-model="username"
              class="md:col-span-2"
            />
            <BaseInput label="First name" v-model="firstName" />
            <BaseInput label="Last name" v-model="lastName" />
            <div class="col-span-1 text-right sm:col-span-2">
              <Button label="Update profile" class="w-full sm:w-fit" disabled />
            </div>
          </aside>
        </div>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-primary-400">Account</h2>
        <div class="mx-auto flex flex-col gap-4 rounded-lg bg-surface-900 p-4">
          <form class="flex flex-col items-end gap-3 sm:flex-row">
            <BaseInput
              label="Email"
              v-model="email"
              type="email"
              class="w-full"
            />
            <Button label="Update" class="w-full sm:w-fit" disabled />
          </form>

          <form class="flex flex-col items-end gap-3 sm:flex-row">
            <BaseInput
              label="Password"
              v-model="password"
              type="password"
              class="w-full"
              placeholder="Enter new password"
            />
            <Button
              label="Update"
              class="sm:py-none w-full sm:w-fit"
              disabled
            />
          </form>
        </div>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-primary-400">Watched list</h2>
      </section>
    </div>
  </main>
</template>
