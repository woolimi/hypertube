<script setup>
const localePath = useLocalePath();
</script>

<template>
  <nav
    class="fixed top-0 z-[999] h-[112px] w-full bg-gradient-to-b from-black to-transparent"
  >
    <div class="mx-auto flex max-w-[1280px] justify-between p-4">
      <div>
        <LanguageSelector />
      </div>

      <NuxtLink :to="localePath('index')">
        <img
          src="~/assets/images/logo-big.png"
          alt="hypertube logo"
          class="h-[20vw] max-h-[60px]"
        />
      </NuxtLink>

      <div>
        <NuxtLink :to="localePath('auth-login')">
          <Button rounded text icon="pi pi-user" aria-label="User Login" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
