<script setup>
import defaultAvatar from "~/assets/images/default_user.webp";

definePageMeta({
  middleware: ["strict-auth"],
});
const uid = useRoute().params.uid;
const userData = ref({});
const axios = useAxios();
const fetching = ref(true);
const localePath = useLocalePath();

onMounted(async () => {
  try {
    const { data } = await axios.get("/users/" + uid);
    userData.value = data;
  } catch (e) {
    navigateTo({ path: localePath("404") });
  } finally {
    fetching.value = false;
  }
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
        <Skeleton
          v-if="fetching"
          shape="circle"
          size="150px"
          class="border-4 border-primary-400"
        />
        <img
          v-else
          :src="userData.image || defaultAvatar"
          class="h-[150px] w-[150px] rounded-[50%] border-4 border-primary-400"
        />
        <h1 class="text-center text-2xl font-extrabold text-primary-400">
          {{ userData.username }}
        </h1>
      </div>

      <div class="w-full rounded-lg bg-surface-900">
        <div
          class="flex items-center gap-2 rounded-t-lg bg-surface-800 px-4 py-2 text-primary-400"
        >
          <i class="pi pi-id-card text-3xl"></i>
          <h2 class="text-2xl font-extrabold">
            {{ $t("Profile.Profile.title") }}
          </h2>
        </div>
        <ul class="flex flex-col gap-2 p-4 text-xl text-white">
          <li class="flex justify-between">
            <span class="text-primary-400">{{ $t("_Global.firstName") }}</span>
            <span>
              {{ userData.firstName }}
            </span>
          </li>
          <li class="flex justify-between">
            <span class="text-primary-400">{{ $t("_Global.lastName") }}</span>
            <span>
              {{ userData.lastName }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <WatchedList :uid="uid" />
    </section>
  </main>
</template>
