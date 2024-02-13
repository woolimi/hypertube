<script setup>
import FtLogo from "~/assets/icons/42.svg";

const localePath = useLocalePath();
const username = ref("");
const password = ref("");
</script>

<template>
  <main
    class="flex min-h-[calc(100vh-64px)] justify-center bg-slate-900 p-4 pt-[112px] lg:p-8 lg:pt-[112px]"
  >
    <div class="mt-10 flex w-full max-w-[450px] flex-col items-center gap-4">
      <h1 class="text-center text-2xl font-[800] md:text-4xl lg:mb-10">
        Login to get access
      </h1>

      <section class="mt-10">
        <div class="flex items-center justify-center gap-2">
          <SocialButton aria-label="42 login" class="h-[56px] w-[56px] !p-0">
            <FtLogo class="h-8 w-8" />
          </SocialButton>
          <SocialButton aria-label="Google login">
            <i class="pi pi-google text-[24px]"></i>
          </SocialButton>
          <SocialButton aria-label="Github login">
            <i class="pi pi-github text-[24px]"></i>
          </SocialButton>
        </div>
      </section>

      <div class="flex w-full items-center gap-3">
        <hr class="w-full border-[1px] border-white" />
        or
        <hr class="w-full border-[1px] border-white" />
      </div>

      <section class="flex w-full flex-col text-center">
        <form class="flex max-w-[450px] flex-col gap-2">
          <BaseInput
            v-model="username"
            type="text"
            label="Username"
            autocomplete="username"
          />
          <BaseInput
            v-model="password"
            type="password"
            label="Password"
            autocomplete="current-password"
          />
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
