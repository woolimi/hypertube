<script setup>
import defaultUser from "assets/images/default_user.webp";
const axios = useAxios();
const localePath = useLocalePath();
const auth = useAuth();
const onLogout = async () => {
  try {
    await auth.doLogout(axios);
    navigateTo({ path: localePath("index") });
  } catch (error) {
    console.error(error);
  }
};
const { userData } = storeToRefs(useUserStore());
</script>

<template>
  <div class="flex items-center gap-2">
    <Button text rounded icon="pi pi-sign-out" @click="onLogout" />

    <NuxtLink
      :to="localePath('profile')"
      class="flex items-center justify-center"
    >
      <Avatar
        :image="userData.image.length > 0 ? userData.image : defaultUser"
        shape="circle"
        class="overflow-hidden"
        size="large"
      />
    </NuxtLink>
  </div>
</template>
