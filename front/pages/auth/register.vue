<script setup>
import FtLogo from "~/assets/icons/42.svg";

definePageMeta({
  layout: "auth",
  middleware: ["non-auth"],
});

const axios = useAxios();
const username = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const localePath = useLocalePath();
const { doRegister, onGoogleLogin, onGithubLogin, onFtLogin } = useAuth();
const { locale } = useI18n();

// TODO: Validation and show error message
const handleOnSubmit = async () => {
  const userInfo = {
    username: username.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  };

  try {
    await doRegister(axios, userInfo, locale.value);
    await navigateTo({ path: localePath("auth-verify-email") });
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="mt-10 flex w-full max-w-[450px] flex-col items-center gap-4">
    <h1 class="text-center text-2xl font-[800] md:text-4xl lg:mb-10">
      {{ $t("AuthRegister.title") }}
    </h1>
    <p class="text-center text-lg text-gray-400">
      {{ $t("AuthRegister.description") }}
    </p>

    <section class="mt-3">
      <div class="flex items-center justify-center gap-2">
        <SocialButton
          aria-label="42 register"
          class="h-[56px] w-[56px] !p-0"
          @click="onFtLogin"
        >
          <FtLogo class="h-8 w-8" />
        </SocialButton>
        <SocialButton aria-label="Google register" @click="onGoogleLogin">
          <i class="pi pi-google text-[24px]"></i>
        </SocialButton>
        <SocialButton aria-label="Github register" @click="onGithubLogin">
          <i class="pi pi-github text-[24px]"></i>
        </SocialButton>
      </div>
    </section>

    <div class="flex w-full items-center gap-3">
      <hr class="w-full border-[1px] border-white" />
      {{ $t("AuthRegister.or") }}
      <hr class="w-full border-[1px] border-white" />
    </div>

    <section class="flex w-full flex-col text-center">
      <form class="grid max-w-[450px] gap-3" @submit.prevent="handleOnSubmit">
        <BaseInput
          v-model="firstName"
          type="text"
          :label="$t('AuthRegister.firstName')"
          autocomplete="given-name"
        />
        <BaseInput
          v-model="lastName"
          type="text"
          :label="$t('AuthRegister.lastName')"
          autocomplete="family-name"
        />
        <BaseInput
          v-model="email"
          type="email"
          :label="$t('AuthRegister.email')"
          autocomplete="email"
          class="sm:col-span-2"
        />
        <BaseInput
          v-model="username"
          type="text"
          :label="$t('AuthRegister.username')"
          autocomplete="username"
        />
        <BaseInput
          v-model="password"
          type="password"
          :label="$t('AuthRegister.password')"
          autocomplete="current-password"
        />
        <Button class="mt-4 w-full sm:col-span-2" type="submit">
          {{ $t("AuthRegister.register") }}
        </Button>
      </form>
    </section>
  </div>
</template>
