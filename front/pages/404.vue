<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div>
    <TheNavbar />
    <main
      class="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4"
    >
      <h1 class="text-6xl">404</h1>
      <p class="mb-5 mt-2 text-2xl">{{ $t(`Error.404`) }}</p>
      <NuxtLink :to="localePath('/')">
        <Button :label="$t('Error.backToHome')" />
      </NuxtLink>
    </main>
    <TheFooter />
  </div>
</template>
