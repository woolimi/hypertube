<script setup>
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const { userData } = storeToRefs(useUserStore());
const email = ref(userData.value?.email);
const username = ref(userData.value?.username);
const firstName = ref(userData.value?.firstName);
const lastName = ref(userData.value?.lastName);
const avatar = ref(userData.value?.image);
const password = ref("");
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
              v-model="username"
              label="Username"
              class="md:col-span-2"
            />
            <BaseInput v-model="firstName" label="First name" />
            <BaseInput v-model="lastName" label="Last name" />
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
              v-model="email"
              label="Email"
              type="email"
              class="w-full"
            />
            <Button label="Update" class="w-full sm:w-fit" disabled />
          </form>

          <form class="flex flex-col items-end gap-3 sm:flex-row">
            <BaseInput
              v-model="password"
              label="Password"
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
