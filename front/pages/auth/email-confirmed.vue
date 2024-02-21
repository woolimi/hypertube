<script setup>
definePageMeta({
  layout: "auth",
  middleware: ["strict-auth"],
});
</script>

<template>
  <div class="mt-10 flex w-full max-w-[450px] flex-col items-center gap-4">
    <h1 class="text-center text-3xl font-[800] sm:text-4xl lg:mb-10">
      Email confirmed!
    </h1>
    <p class="text-center text-2xl text-gray-400">You can now enjoy movie!</p>
    <div>
      <NuxtLink :to="localePath('index')">
        <Button label="Watch movie" />
      </NuxtLink>
    </div>
  </div>
</template>
