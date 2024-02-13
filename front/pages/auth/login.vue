<script setup>
import FtLogo from "~/assets/images/42.svg";

const localePath = useLocalePath();
const username = ref("");
const password = ref("");
</script>

<template>
  <main
    class="flex min-h-[calc(100vh-64px)] justify-center p-4 pt-[112px] lg:p-8 lg:pt-[112px]"
  >
    <div class="mt-10 flex w-full max-w-[450px] flex-col items-center gap-4">
      <h1 class="text-center text-2xl font-[800] md:text-4xl lg:mb-10">
        LOGIN TO GET ACCESS
      </h1>

      <section>
        <div class="flex items-center justify-center gap-2">
          <NuxtLink
            :to="localePath('index')"
            aria-label="42 login"
            :class="$style.social"
          >
            <FtLogo class="ftLogo h-8 w-8" />
          </NuxtLink>
          <Button
            class="shrink-0 text-[24px]"
            icon="pi pi-google"
            rounded
            raised
            text
            aria-label="Google login"
          />
          <Button
            icon="pi pi-github"
            class="shrink-0 text-[24px]"
            rounded
            raised
            text
            aria-label="Github login"
          />
        </div>
      </section>

      <div class="flex w-full items-center gap-3">
        <hr class="w-full border-[1px] border-white" />
        or
        <hr class="w-full border-[1px] border-white" />
      </div>

      <section class="flex w-full flex-col text-center">
        <form class="flex max-w-[450px] flex-col gap-2">
          <BaseInput v-model="username" type="text" label="username" />
          <BaseInput v-model="password" type="password" label="Password" />
          <Button class="mt-4 w-full">Login </Button>
        </form>

        <div class="mt-5">
          <p>You don't have an account yet?</p>
          <p>
            Click
            <BaseLink :to="localePath('auth-register')"> here </BaseLink> to
            register
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" module>
.social {
  @apply rounded-[50%] fill-primary-400 p-3;

  &:hover {
    @apply bg-primary-300 bg-opacity-20;

    svg {
      @apply fill-primary-400;
    }
  }
}
</style>
