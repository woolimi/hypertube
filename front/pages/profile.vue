<script setup>
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import defaultUser from "assets/images/default_user.webp";

import { useProfile } from "../composables/useProfile";

definePageMeta({
  middleware: ["loose-auth"],
});

//TODO: divide files for each block(Profile, Account, WatchedList)
const { userData } = storeToRefs(useUserStore());
const {
  usernameValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
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

/* dirtys */
const dirtyProfile = ref(false);
const dirtyEmail = ref(false);
const dirtyPassword = ref(false);

/* loading stataes for each update button */
const loading = reactive({
  profile: false,
  email: false,
  password: false,
});

const { error: errorUsername } = usernameValidator(dirtyProfile, firstName, t);

const { error: errorFirstName } = firstNameValidator(
  dirtyProfile,
  firstName,
  t,
);
const { error: errorLastName } = lastNameValidator(dirtyProfile, lastName, t);

const { error: errorEmail } = emailValidator(dirtyEmail, email, t);

const { error: errorPassword } = passwordValidator(dirtyPassword, password, t);

//TODO: put error handling - will do it after devide component
async function onUpdateProfile() {
  dirtyProfile.value = true;
  loading.profile = true;
  if (errorUsername.value || errorFirstName.value || errorLastName.value) {
    return;
  }
  await updateProfile(userData.value.id, {
    username: username.value,
    firstName: firstName.value,
    lastName: lastName.value,
  });
  dirtyProfile.value = false;
  loading.profile = false;
}

//TODO: put error handling - will do it after devide component
async function onUpdateEmail() {
  dirtyEmail.value = true;
  loading.email = true;
  if (errorEmail.value) {
    return;
  }
  await updateProfile(userData.value.id, {
    email: email.value,
  });
  dirtyEmail.value = false;
  loading.email = false;
}

//TODO: put error handling - will do it after devide component
async function onUpdatePassword() {
  dirtyPassword.value = true;
  loading.password = true;
  if (errorPassword.value) {
    return;
  }
  await updateProfile(userData.value.id, {
    password: password.value,
  });
  dirtyPassword.value = false;
  loading.password = false;
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
          class="mx-auto flex flex-col items-center justify-center gap-5 rounded-lg bg-surface-900 p-4 sm:flex-row"
        >
          <div class="relative flex items-center justify-center">
            <Avatar
              :image="avatar.length > 0 ? avatar : defaultUser"
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
              :label="$t('_Global.username')"
              class="md:col-span-2"
            />
            <BaseInput
              v-model="firstName"
              :error-message="errorFirstName"
              :label="$t('_Global.firstName')"
            />
            <BaseInput
              v-model="lastName"
              :error-message="errorLastName"
              :label="$t('_Global.lastName')"
            />
            <div class="col-span-1 text-right sm:col-span-2">
              <Button
                :loading="loading.profile"
                :label="
                  loading.profile
                    ? null
                    : `${$t('_Global.update')} ${t('Profile.Profile.title')}`
                "
                class="w-full min-w-32 sm:w-fit"
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
              :label="$t('_Global.email')"
              autocomplete="none"
              type="email"
              class="w-full"
            />
            <Button
              class="w-full min-w-32 whitespace-nowrap sm:mt-7 sm:w-fit"
              :loading="loading.email"
              :label="loading.email ? null : $t('_Global.update')"
              @click="onUpdateEmail"
            />
          </div>

          <div class="flex flex-col items-start gap-3 sm:flex-row">
            <BaseInput
              v-model="password"
              :label="$t('_Global.password')"
              type="password"
              class="w-full"
              :placeholder="$t('Profile.Account.enterNewPassword')"
              autocomplete="none"
              :error-message="errorPassword"
            />
            <Button
              class="w-full min-w-32 whitespace-nowrap sm:mt-7 sm:w-fit"
              :loading="loading.password"
              :label="loading.password ? null : $t('_Global.update')"
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
