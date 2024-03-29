<script setup>
import FtLogo from "~/assets/icons/42.svg";

definePageMeta({
  middleware: ["non-auth"],
});

const localePath = useLocalePath();
const username = ref("");
const password = ref("");
const axios = useAxios();
const { doLogin, onGoogleLogin, onGithubLogin, onFtLogin } = useAuth();
const { isEmailVerified } = storeToRefs(useUserStore());
const loading = ref(false);
const dirty = ref(false);
const { passwordValidator, usernameValidator } = useValidator();
const { t } = useI18n();

const { error: errorPassword } = passwordValidator(dirty, password, t);
const { error: errorUsername } = usernameValidator(dirty, username, t);
const errorGlobal = ref("");

const onLogin = async () => {
  dirty.value = true;
  if (errorUsername.value || errorPassword.value) {
    return;
  }

  try {
    loading.value = true;
    await doLogin(axios, {
      username: username.value,
      password: password.value,
    });
    if (isEmailVerified.value) {
      await navigateTo({ path: localePath("index") });
    } else {
      await navigateTo({ path: localePath("auth-verify-email") });
    }
    errorGlobal.value = "";
  } catch (e) {
    if (e.response && e.response.data.code) {
      errorGlobal.value = t(`Error.${e.response.data.code}`);
    } else {
      errorGlobal.value = t(`Error.GENERAL_ERROR`);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main
    class="flex min-h-[calc(100vh-64px)] justify-center bg-slate-900 p-4 pt-[112px] lg:p-8 lg:pt-[112px]"
  >
    <div class="mt-10 flex w-full max-w-[450px] flex-col items-center gap-4">
      <h1 class="text-center text-2xl font-[800] md:text-4xl lg:mb-10">
        {{ $t("AuthLogin.title") }}
      </h1>

      <section class="mt-10">
        <div class="flex items-center justify-center gap-2">
          <SocialButton
            aria-label="42 login"
            class="h-[56px] w-[56px] !p-0"
            @click="onFtLogin"
          >
            <FtLogo class="h-8 w-8" />
          </SocialButton>
          <SocialButton aria-label="Google login" @click="onGoogleLogin">
            <i class="pi pi-google text-[24px]"></i>
          </SocialButton>
          <SocialButton aria-label="Github login" @click="onGithubLogin">
            <i class="pi pi-github text-[24px]"></i>
          </SocialButton>
        </div>
      </section>

      <div class="flex w-full items-center gap-3">
        <hr class="w-full border-[1px] border-white" />
        {{ $t("AuthLogin.or") }}
        <hr class="w-full border-[1px] border-white" />
      </div>

      <section class="flex w-full flex-col text-center">
        <form
          class="flex max-w-[450px] flex-col gap-2"
          @submit.prevent="onLogin"
        >
          <BaseInput
            v-model="username"
            type="text"
            :label="$t('_Global.username')"
            autocomplete="username"
            :error-message="errorUsername"
            :error="!!errorGlobal"
          />
          <BaseInput
            v-model="password"
            type="password"
            :label="$t('_Global.password')"
            autocomplete="current-password"
            :error-message="errorPassword"
            :error="!!errorGlobal"
          />
          <Button
            type="submit"
            class="mt-4 w-full"
            :loading="loading"
            :label="loading ? null : $t('AuthLogin.login')"
          />

          <small v-if="dirty && errorGlobal" class="mt-2 text-lg text-red-500">
            {{ errorGlobal }}
          </small>
        </form>

        <div class="mt-5" v-html="$t('AuthLogin.noAccount')" />
        <div class="mt-5" v-html="$t('AuthLogin.forgotPassword')" />
      </section>
    </div>
  </main>
</template>
