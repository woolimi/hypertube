<script setup>
definePageMeta({
  layout: "password-change",
  middleware: ["non-auth"],
});
</script>

<template>
  <div class="mt-5 flex w-full max-w-[600px] flex-col items-center gap-4">
    <h1 class="text-center text-3xl font-[800] sm:text-4xl lg:mb-10">
      {{ $t("AuthForgotPassword.emailSent.title") }}
    </h1>
    <p class="text-center text-2xl text-gray-400">
      {{ $t("AuthForgotPassword.emailSent.description") }}
    </p>
    <div class="mt-10">
      <NuxtLink :to="localePath('index')">
        <Button :label="$t('AuthForgotPassword.emailSent.button')" />
      </NuxtLink>
    </div>
  </div>
</template>
