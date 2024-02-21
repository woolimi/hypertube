<script setup>
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { useProfile } from "../composables/useProfile";

definePageMeta({
  middleware: ["loose-auth"],
});

const { userData } = storeToRefs(useUserStore());
const {
  validator,
  passwordRule,
  emailRule,
  minLengthRule,
  maxLengthRule,
  requiredRule,
  DEFAULT_MAX,
  DEFAULT_MIN,
} = useValidator();
const { t } = useI18n();
const { updateAvatar, updateProfile } = useProfile();

const email = ref(userData.value?.email);
const username = ref(userData.value?.username);
const firstName = ref(userData.value?.firstName);
const lastName = ref(userData.value?.lastName);
const avatar = computed({
  get() {
    return userData.value?.image;
  },
  set(image) {
    userData.value.image = image;
  },
});
const password = ref("");
const fileInput = ref(null);

const dirtyProfile = ref(false);
const dirtyEmail = ref(false);
const dirtyPassword = ref(false);

const { error: errorUsername } = validator(dirtyProfile, username, [
  requiredRule(t("Error.REQUIRED", { value: t("Profile.Profile.username") })),
  minLengthRule(
    t("Error.MIN_LENGTH", {
      value: t("Profile.Profile.username"),
      length: DEFAULT_MIN,
    }),
  ),
  maxLengthRule(
    t("Error.MAX_LENGTH", {
      value: t("Profile.Profile.username"),
      length: DEFAULT_MAX,
    }),
  ),
]);

const { error: errorFirstName } = validator(dirtyProfile, firstName, [
  requiredRule(t("Error.REQUIRED", { value: t("Profile.Profile.firstName") })),
  minLengthRule(
    t("Error.MIN_LENGTH", {
      value: t("Profile.Profile.firstName"),
      length: DEFAULT_MIN,
    }),
  ),
  maxLengthRule(
    t("Error.MAX_LENGTH", {
      value: t("Profile.Profile.firstName"),
      length: DEFAULT_MAX,
    }),
  ),
]);

const { error: errorLastName } = validator(dirtyProfile, lastName, [
  requiredRule(t("Error.REQUIRED", { value: t("Profile.Profile.lastName") })),
  minLengthRule(
    t("Error.MIN_LENGTH", {
      value: t("Profile.Profile.lastName"),
      length: DEFAULT_MIN,
    }),
  ),
  maxLengthRule(
    t("Error.MAX_LENGTH", {
      value: t("Profile.Profile.lastName"),
      length: DEFAULT_MAX,
    }),
  ),
]);

const { error: errorEmail } = validator(dirtyEmail, email, [
  requiredRule(t("Error.REQUIRED", { value: t("Profile.Account.email") })),
  emailRule(t("Error.INVALID_EMAIL")),
]);

const { error: errorPassword } = validator(dirtyPassword, password, [
  requiredRule(t("Error.REQUIRED", { value: t("Profile.Account.password") })),
  passwordRule(t("Error.INVALID_PASSWORD")),
]);

//TODO: put error handling
async function onUpdateProfile() {
  dirtyProfile.value = true;
  if (errorUsername.value || errorFirstName.value || errorLastName.value) {
    return;
  }
  await updateProfile(userData.value.id, {
    username: username.value,
    firstName: firstName.value,
    lastName: lastName.value,
  });
  dirtyProfile.value = false;
}

//TODO: put error handling
async function onUpdateEmail() {
  dirtyEmail.value = true;
  if (errorEmail.value) {
    return;
  }
  await updateProfile(userData.value.id, {
    email: email.value,
  });
  dirtyEmail.value = false;
}

//TODO: put error handling
async function onUpdatePassword() {
  dirtyPassword.value = true;
  if (errorPassword.value) {
    return;
  }
  await updateProfile(userData.value.id, {
    password: password.value,
  });
  dirtyPassword.value = false;
}

function onClickAvatar() {
  fileInput.value.click();
}
</script>
<template>
  <main class="min-h-[calc(100vh-64px)] px-4 pb-20 pt-[112px] md:px-8">
    <div class="mx-auto flex max-w-[540px] flex-col flex-wrap gap-10">
      <section>
        <h2 class="text-3xl font-bold text-primary-400">
          {{ $t("Profile.Profile.title") }}
        </h2>
        <div
          class="mx-auto flex items-center justify-center gap-5 rounded-lg bg-surface-900 p-4"
        >
          <div class="relative flex items-center justify-center">
            <Avatar
              :image="avatar"
              size="xlarge"
              shape="circle"
              class="m-auto overflow-hidden"
            />
            <i
              class="pi pi-images absolute m-auto cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-100"
              style="font-size: 2rem"
              @click="onClickAvatar"
            />
          </div>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept="image/*"
            maxlength="1000000"
            @change="updateAvatar"
          />
          <aside class="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
            <BaseInput
              v-model="username"
              :error-message="errorUsername"
              :label="$t('Profile.Profile.username')"
              class="md:col-span-2"
            />
            <BaseInput
              v-model="firstName"
              :error-message="errorFirstName"
              :label="$t('Profile.Profile.firstName')"
            />
            <BaseInput
              v-model="lastName"
              :error-message="errorLastName"
              :label="$t('Profile.Profile.lastName')"
            />
            <div class="col-span-1 text-right sm:col-span-2">
              <Button
                :label="`${$t('_Global.update')} ${t('Profile.Profile.title')}`"
                class="w-full sm:w-fit"
                @click="onUpdateProfile"
              />
            </div>
          </aside>
        </div>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-primary-400">
          {{ $t("Profile.Account.title") }}
        </h2>
        <div class="mx-auto flex flex-col gap-4 rounded-lg bg-surface-900 p-4">
          <div class="flex flex-col items-start gap-3 sm:flex-row">
            <BaseInput
              v-model="email"
              :error-message="errorEmail"
              :label="$t('Profile.Account.email')"
              autocomplete="none"
              type="email"
              class="w-full"
            />
            <Button
              :label="$t('_Global.update')"
              class="mt-7 whitespace-nowrap sm:w-fit"
              @click="onUpdateEmail"
            />
          </div>

          <div class="flex flex-col items-start gap-3 sm:flex-row">
            <BaseInput
              v-model="password"
              :label="$t('Profile.Account.password')"
              type="password"
              class="w-full"
              :placeholder="$t('Profile.Account.enterNewPassword')"
              autocomplete="none"
              :error-message="errorPassword"
            />
            <Button
              :label="$t('_Global.update')"
              class="mt-7 whitespace-nowrap sm:w-fit"
              @click="onUpdatePassword"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-primary-400">
          {{ $t("Profile.WatchedList.title") }}
        </h2>
      </section>
    </div>
  </main>
</template>
