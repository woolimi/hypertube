<script setup>
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

definePageMeta({
  middleware: ["loose-auth"],
});

const { userData } = storeToRefs(useUserStore());
const axios = useAxios();
const router = useRouter();

const email = ref(userData.value?.email);
const username = ref(userData.value?.username);
const firstName = ref(userData.value?.firstName);
const lastName = ref(userData.value?.lastName);
const avatar = computed({
  get() {
    return userData.value?.image;
  },
  set(image) {
    userData.value.image = image;
  },
});
const password = ref("");
const fileInput = ref(null);

function onUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = async () => {
      const formData = new FormData();
      formData.append("image", file);
      const { id } = userData.value;
      if (id) {
        formData.append("userId", id);
        try {
          await axios.put(`/users/avatar`, formData);
          router.go();
        } catch (error) {
          console.error(error);
        }
      }
    };
    reader.readAsDataURL(file);
  }
}

function onClickAvatar() {
  fileInput.value.click();
}
</script>
<template>
  <main class="min-h-[calc(100vh-64px)] px-4 pb-20 pt-[112px] md:px-8">
    <div class="mx-auto flex max-w-[540px] flex-col flex-wrap gap-10">
      <section>
        <h2 class="text-3xl font-bold text-primary-400">Profile</h2>
        <div
          class="mx-auto flex items-center justify-center gap-5 rounded-lg bg-surface-900 p-4"
        >
          <div class="relative flex items-center justify-center">
            <Avatar
              :image="avatar"
              size="xlarge"
              shape="circle"
              class="m-auto overflow-hidden"
            />
            <i
              class="pi pi-images absolute m-auto cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-100"
              style="font-size: 2rem"
              @click="onClickAvatar"
            />
          </div>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept="image/*"
            maxlength="1000000"
            @change="onUpload"
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
              autocomplete="none"
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
