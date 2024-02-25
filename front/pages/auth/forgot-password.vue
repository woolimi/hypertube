<script setup>
definePageMeta({
  layout: "password-change",
  middleware: ["non-auth"],
});

// const axios = useAxios();

const username = ref("");
const email = ref("");
const axios = useAxios();
const localePath = useLocalePath();
const { emailValidator, usernameValidator } = useValidator();
const { doCheckUserCredentials } = useAuth();
const { t } = useI18n();
const loading = ref(false);
const dirty = ref(false);
const { error: errorEmail } = emailValidator(dirty, email, t);
const { error: errorUsername } = usernameValidator(dirty, username, t);
const errorGlobal = ref("");
const { locale } = useI18n();

const handleOnSubmit = async () => {
  dirty.value = true;
  if (errorEmail.value || errorUsername.value) return;

  try {
    loading.value = true;
    await doCheckUserCredentials(
      axios,
      {
        username: username.value,
        email: email.value,
      },
      locale.value,
    );
    await navigateTo({ path: localePath("auth-password-email-sent") });
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
        {{ $t("AuthForgotPassword.title") }}
      </h1>
      <div class="flex w-full items-center gap-3">
        {{ $t("AuthForgotPassword.description") }}
      </div>
      <br />
      <section class="flex w-full flex-col text-center">
        <form class="grid max-w-[450px] gap-3" @submit.prevent="handleOnSubmit">
          <BaseInput
            v-model="username"
            type="text"
            :label="$t('_Global.username')"
            class="sm:col-span-2"
            autocomplete="username"
            :error-message="errorUsername"
            :error="!!errorGlobal"
          />
          <BaseInput
            v-model="email"
            type="email"
            :label="$t('_Global.email')"
            autocomplete="email"
            class="sm:col-span-2"
            :error-message="errorEmail"
            :error="!!errorGlobal"
          />
          <Button
            class="mt-4 w-full sm:col-span-2"
            type="submit"
            :label="loading ? null : $t('AuthForgotPassword.submit')"
            :loading="loading"
          />
          <small v-if="dirty && errorGlobal" class="mt-2 text-lg text-red-500">
            {{ errorGlobal }}
          </small>
        </form>
      </section>
    </div>
  </main>
</template>
