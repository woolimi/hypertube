<script setup>
const localePath = useLocalePath();
const { isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <nav
    class="fixed top-0 z-[999] h-[112px] w-full bg-gradient-to-b from-black to-transparent"
  >
    <div class="mx-auto flex max-w-[1280px] justify-between p-4">
      <div>
        <LanguageSelector />
      </div>

      <NuxtLink
        :to="localePath('index')"
        class="absolute left-[50%] -translate-x-1/2"
      >
        <img
          src="~/assets/images/logo-big.png"
          alt="hypertube logo"
          class="h-[20vw] max-h-[60px]"
        />
      </NuxtLink>

      <div>
        <ProfileSelector v-if="isLoggedIn" />
        <LoginSelector v-else />
      </div>
    </div>
  </nav>
</template>
