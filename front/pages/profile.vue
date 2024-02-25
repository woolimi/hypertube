<script setup>
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import defaultUser from "assets/images/default_user.webp";

import { useProfile } from "../composables/useProfile";

definePageMeta({
  layout: "profile",
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

const axios = useAxios();
const email = ref(userData.value?.email);
const username = ref(userData.value?.username);
const firstName = ref(userData.value?.firstName);
const lastName = ref(userData.value?.lastName);
const password = ref("");
const confirmPassword = ref("");
const avatar = computed({
  get() {
    return userData.value?.image;
  },
  set(image) {
    userData.value.image = image;
  },
});
const fileInput = ref(null);

const isProfileUpdateButtonDisabled = () => {
  return (
    userData.value?.username === username.value &&
    userData.value?.firstName === firstName.value &&
    userData.value?.lastName === lastName.value
  );
};

const isEmailUpdateButtonDisabled = () => {
  return userData.value?.email === email.value;
};

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

const { error: errorUsername } = usernameValidator(dirtyProfile, username, t);

const { error: errorFirstName } = firstNameValidator(
  dirtyProfile,
  firstName,
  t,
);
const { error: errorLastName } = lastNameValidator(dirtyProfile, lastName, t);

const { error: errorEmail } = emailValidator(dirtyEmail, email, t);

const { error: errorPassword } = passwordValidator(dirtyPassword, password, t);
const { error: errorConfirmPassword } = passwordValidator(
  dirtyPassword,
  confirmPassword,
  t,
);

const userProfileUpdateSuccessful = ref("");
const userEmailUpdateSuccessful = ref("");
const userPasswordUpdateSuccessful = ref("");

const errorUpdateProfile = ref("");
const errorUpdateEmail = ref("");
const errorUpdatePassword = ref("");

//TODO: put error handling - will do it after devide component
const onUpdateProfile = async () => {
  dirtyProfile.value = true;
  if (errorUsername.value || errorFirstName.value || errorLastName.value) {
    return;
  }
  if (
    userData.value.username === username.value &&
    userData.value.firstName === firstName.value &&
    userData.value.lastName === lastName.value
  )
    return;
  try {
    loading.profile = true;
    await updateProfile(axios, userData.value.id, {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    });
    // TODO: instead of printing error
    errorUpdateProfile.value = "";
    userProfileUpdateSuccessful.value = t("Profile.Profile.success");
  } catch (e) {
    userProfileUpdateSuccessful.value = "";
    if (e.response && e.response.data.code) {
      errorUpdateProfile.value = t(`Error.${e.response.data.code}`);
    } else {
      errorUpdateProfile.value = t(`Error.GENERAL_ERROR`);
    }
  } finally {
    loading.profile = false;
  }
};

//TODO: put error handling - will do it after devide component
async function onUpdateEmail() {
  dirtyEmail.value = true;

  if (errorEmail.value) {
    return;
  }

  if (userData.value.email === email.value) return;

  try {
    loading.email = true;
    await updateProfile(axios, userData.value.id, {
      email: email.value,
    });
    errorUpdateEmail.value = "";
    userEmailUpdateSuccessful.value = t("Profile.Account.successEmail");
  } catch (e) {
    userEmailUpdateSuccessful.value = "";
    if (e.response && e.response.data.code) {
      errorUpdateEmail.value = t(`Error.${e.response.data.code}`);
    } else {
      errorUpdateEmail.value = t(`Error.GENERAL_ERROR`);
    }
  } finally {
    loading.email = false;
  }
}

//TODO: put error handling - will do it after devide component
async function onUpdatePassword() {
  dirtyPassword.value = true;

  if (!password.value || !confirmPassword.value) return;

  if (password.value != confirmPassword.value) {
    errorUpdatePassword.value = t("Error.PASSWORD_DOES_NOT_MATCH");
    return;
  }

  if (errorPassword.value || errorConfirmPassword.value) return;

  try {
    loading.password = true;
    await updateProfile(axios, userData.value.id, {
      password: password.value,
    });
    errorUpdatePassword.value = "";
    userPasswordUpdateSuccessful.value = t("Profile.Account.successPassword");
  } catch (e) {
    userPasswordUpdateSuccessful.value = "";
    if (e.response && e.response.data.code) {
      errorUpdatePassword.value = t(`Error.${e.response.data.code}`);
    } else {
      errorUpdatePassword.value = t(`Error.GENERAL_ERROR`);
    }
  } finally {
    loading.password = false;
  }
}

function onClickAvatar() {
  fileInput.value.click();
}
</script>
<template>
  <main class="flex min-h-[calc(100vh-64px)] px-4 pb-20 pt-10 md:px-8">
    <div class="mx-auto flex max-w-[540px] flex-col flex-wrap gap-10">
      <section>
        <h2 class="mb-4 text-3xl font-bold text-primary-400">
          {{ $t("Profile.Profile.title") }}
        </h2>
        <div class="bg-slate-800">
          <div class="relative flex items-center justify-center">
            <Avatar
              :image="avatar.length > 0 ? avatar : defaultUser"
              size="xlarge"
              shape="circle"
              class="m-auto overflow-hidden"
            />
            <i
              class="pi pi-images absolute m-auto cursor-pointer p-20 opacity-0 transition-opacity duration-300 hover:opacity-100"
              style="font-size: 2rem"
              @click="onClickAvatar"
            />
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              accept="image/*"
              maxlength="1000000"
              @change="updateAvatar"
            />
          </div>
          <br />
          <div
            class="mx-auto flex flex-col items-center justify-center gap-5 rounded-lg p-5 sm:flex-row"
          >
            <form @submit.prevent="onUpdateProfile">
              <aside class="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                <BaseInput
                  v-model="username"
                  type="text"
                  :label="$t('_Global.username')"
                  autocomplete="username"
                  :error-message="errorUsername"
                  :error="!!errorUpdateProfile"
                  class="md:col-span-2"
                />
                <BaseInput
                  v-model="firstName"
                  type="text"
                  :label="$t('_Global.firstName')"
                  autocomplete="string"
                  :error-message="errorFirstName"
                  :error="!!errorUpdateProfile"
                />
                <BaseInput
                  v-model="lastName"
                  type="text"
                  :label="$t('_Global.lastName')"
                  autocomplete="string"
                  :error-message="errorLastName"
                  :error="!!errorUpdateProfile"
                />
                <small
                  v-if="dirtyProfile && errorUpdateProfile"
                  class="mt-2 text-lg text-red-500"
                >
                  {{ errorUpdateProfile }}
                </small>
                <small
                  v-if="userProfileUpdateSuccessful"
                  class="mt-2 text-lg text-blue-500"
                >
                  {{ userProfileUpdateSuccessful }}
                </small>
                <div class="col-span-1 text-right sm:col-span-2">
                  <Button
                    v-once
                    type="submit"
                    :loading="loading.profile"
                    :label="
                      loading.profile
                        ? null
                        : `${$t('_Global.update')} ${t('Profile.Profile.title')}`
                    "
                    class="w-full min-w-32 sm:w-fit"
                    @click="
                      isProfileUpdateButtonDisabled ? null : onUpdateProfile
                    "
                  />
                </div>
              </aside>
            </form>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-3xl font-bold text-primary-400">
          {{ $t("Profile.Account.title") }}
        </h2>
        <div class="mx-auto flex flex-col gap-3 rounded-lg bg-slate-800 p-4">
          <form class="pb-2" @submit.prevent="onUpdateEmail">
            <!-- First Row -->
            <BaseInput
              v-model="email"
              :error-message="errorEmail"
              :label="$t('_Global.email')"
              autocomplete="none"
              type="email"
              class="w-full p-2"
            />

            <!-- Second Row -->
            <div class="mt-2 flex items-center justify-between p-2">
              <div class="text-left">
                <small
                  v-if="dirtyEmail && errorUpdateEmail"
                  class="mt-2 text-lg text-red-500"
                >
                  {{ errorUpdateEmail }}
                </small>
                <small
                  v-if="userEmailUpdateSuccessful"
                  class="mt-2 text-lg text-blue-500"
                >
                  {{ userEmailUpdateSuccessful }}
                </small>
              </div>
              <Button
                type="submit"
                class="min-w-32 whitespace-nowrap"
                :loading="loading.email"
                :label="loading.email ? null : $t('_Global.update')"
                @click="isEmailUpdateButtonDisabled ? null : onUpdateProfile"
              />
            </div>
          </form>

          <form class="pb-2" @submit.prevent="onUpdatePassword">
            <!-- First Row -->
            <BaseInput
              v-model="password"
              :error-message="errorPassword"
              :label="$t('_Global.password')"
              autocomplete="none"
              type="password"
              class="w-full p-2"
            />

            <BaseInput
              v-model="confirmPassword"
              :error-message="errorConfirmPassword"
              :label="
                t('Profile.Account.confirm') + ' ' + $t('_Global.password')
              "
              autocomplete="none"
              type="password"
              class="w-full p-2"
            />

            <!-- Second Row -->
            <div
              class="mt-2 flex items-center justify-between bg-slate-800 p-2"
            >
              <div class="text-left">
                <small
                  v-if="dirtyPassword && errorUpdatePassword"
                  class="mt-2 text-lg text-red-500"
                >
                  {{ errorUpdatePassword }}
                </small>
                <small
                  v-if="userPasswordUpdateSuccessful"
                  class="mt-2 text-lg text-blue-500"
                >
                  {{ userPasswordUpdateSuccessful }}
                </small>
              </div>
              <Button
                type="submit"
                class="min-w-32 whitespace-nowrap"
                :loading="loading.password"
                :label="loading.passoword ? null : $t('_Global.update')"
              />
            </div>
          </form>
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-3xl font-bold text-primary-400">
          {{ $t("Profile.WatchedList.title") }}
        </h2>
      </section>
    </div>
  </main>
</template>
