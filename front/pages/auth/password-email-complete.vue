<script setup>
definePageMeta({
  layout: "password-change",
  middleware: ["strict-auth"],
});
</script>

<template>
  <div class="mt-5 flex w-full max-w-[450px] flex-col items-center gap-4">
    <h1 class="text-center text-3xl font-[800] sm:text-4xl lg:mb-10">
      {{ $t("AuthForgotPassword.complete.title") }}
    </h1>
    <p class="text-center text-2xl text-gray-400">
      {{ $t("AuthForgotPassword.complete.description") }}
    </p>
    <div class="mt-10">
      <NuxtLink :to="localePath('/')">
        <Button :label="$t('AuthForgotPassword.complete.button')" />
      </NuxtLink>
    </div>
  </div>
</template>
