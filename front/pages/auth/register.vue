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

const {
  usernameValidator,
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
} = useValidator();
const { t } = useI18n();
const loading = ref(false);
const dirty = ref(false);
const { error: errorUsername } = usernameValidator(dirty, username, t);
const { error: errorFirstName } = firstNameValidator(dirty, firstName, t);
const { error: errorLastName } = lastNameValidator(dirty, lastName, t);
const { error: errorEmail } = emailValidator(dirty, email, t);
const { error: errorPassword } = passwordValidator(dirty, password, t);
const errorGlobal = ref("");

const browserLanguage = process.client
  ? navigator.language.toLowerCase()
  : "en";
const locale = browserLanguage.startsWith("fr") ? "fr" : "en";

// TODO: Validation and show error message
const handleOnSubmit = async () => {
  dirty.value = true;
  if (
    errorUsername.value ||
    errorFirstName.value ||
    errorLastName.value ||
    errorEmail.value ||
    errorPassword.value
  )
    return;

  const userInfo = {
    username: username.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  };

  try {
    loading.value = true;

    await doRegister(axios, userInfo, locale.value);

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
          :label="$t('_Global.firstName')"
          autocomplete="given-name"
          :error-message="errorFirstName"
          :error="!!errorGlobal"
        />
        <BaseInput
          v-model="lastName"
          type="text"
          :label="$t('_Global.lastName')"
          autocomplete="family-name"
          :error-message="errorLastName"
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
        <Button class="mt-4 w-full sm:col-span-2" type="submit">
          {{ $t("AuthRegister.register") }}
        </Button>
        <small v-if="dirty && errorGlobal" class="mt-2 text-lg text-red-500">
          {{ errorGlobal }}
        </small>
      </form>
    </section>
  </div>
</template>
