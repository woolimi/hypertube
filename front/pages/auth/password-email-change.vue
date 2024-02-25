<script setup>
definePageMeta({
  layout: "password-change",
  middleware: ["strict-auth"],
});

const axios = useAxios();
const password = ref("");
const confirmPassword = ref("");
const { userData } = storeToRefs(useUserStore());
const { passwordValidator } = useValidator();
const localePath = useLocalePath();
const { t } = useI18n();
const loading = ref(false);
const dirty = ref(false);
const { error: errorPassword } = passwordValidator(dirty, password, t);
const { error: errorConfirmPassword } = passwordValidator(
  dirty,
  confirmPassword,
  t,
);
const errorGlobal = ref("");

const { updateProfile } = useProfile();

const handleOnSubmit = async () => {
  dirty.value = true;
  if (errorPassword.value || errorConfirmPassword.value) return;

  if (!password.value || !confirmPassword.value) return;

  if (password.value != confirmPassword.value) {
    errorGlobal.value = t("Error.PASSWORD_DOES_NOT_MATCH");
    return;
  }

  try {
    loading.value = true;
    console.log(userData.value.id);
    await updateProfile(axios, userData.value.id, {
      password: password.value,
    });
    await navigateTo({ path: localePath("auth-password-email-complete") });
    errorGlobal.value = "";
  } catch (e) {
    console.log(e);
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
  <div class="mt-10 flex w-full max-w-[450px] flex-col items-center gap-4">
    <h1 class="text-center text-3xl font-[800] sm:text-4xl lg:mb-10">
      {{ $t("AuthForgotPassword.changePassword.title") }}
    </h1>
    <p class="text-center text-2xl text-gray-400">
      {{ $t("AuthForgotPassword.changePassword.description") }}
    </p>
    <section class="flex w-full flex-col text-center">
      <form class="grid max-w-[450px] gap-3" @submit.prevent="handleOnSubmit">
        <BaseInput
          v-model="password"
          type="password"
          :label="$t('_Global.password')"
          autocomplete="password"
          class="sm:col-span-2"
          :error-message="errorPassword"
          :error="!!errorGlobal"
        />
        <BaseInput
          v-model="confirmPassword"
          type="password"
          :label="
            t('AuthForgotPassword.changePassword.confirm') +
            ' ' +
            $t('_Global.password')
          "
          autocomplete="none"
          class="sm:col-span-2"
          :error-message="errorConfirmPassword"
          :error="!!errorGlobal"
        />
        <Button
          class="mt-4 w-full sm:col-span-2"
          type="submit"
          :label="
            loading ? null : $t('AuthForgotPassword.changePassword.button')
          "
          :loading="loading"
        />
        <small v-if="dirty && errorGlobal" class="mt-2 text-lg text-red-500">
          {{ errorGlobal }}
        </small>
      </form>
    </section>
  </div>
</template>
