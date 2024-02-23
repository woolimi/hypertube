<script setup>
definePageMeta({
  layout: "auth",
  middleware: ["non-auth"],
});

// const axios = useAxios();

const email = ref("");
const localePath = useLocalePath();
const { emailValidator } = useValidator();
const { t } = useI18n();
// const loading = ref(false);
const dirty = ref(false);
const { error: errorEmail } = emailValidator(dirty, email, t);

const handleOnSubmit = async () => {
  dirty.value = true;
  if (errorEmail.value) return;

  try {
    loading.value = true;
    await navigateTo({ path: localePath("auth-verify-email") });
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
      <section class="flex w-full flex-col text-center">
        <form class="grid max-w-[450px] gap-3" @submit.prevent="handleOnSubmit">
          <BaseInput
            v-model="email"
            type="email"
            :label="$t('_Global.email')"
            autocomplete="email"
            class="sm:col-span-2"
            :error-message="errorEmail"
            :error="!!errorGlobal"
          />
          <Button class="mt-4 w-full sm:col-span-2" type="submit">
            {{ $t("AuthForgotPassword.submit") }}
          </Button>
        </form>
      </section>
    </div>
  </main>
</template>
