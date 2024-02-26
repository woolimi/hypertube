import defaultAvatar from "~/assets/images/default_user.webp";
import type { UserData } from "~/types";

export const useUserStore = defineStore("user", () => {
  const userData = ref<UserData>({} as UserData);
  const refreshTokenIntervalId = ref();

  const isLoggedIn = computed(() => !!userData.value.accessToken);
  const isEmailVerified = computed(() => userData.value.emailVerified);
  const userImage = computed(() => {
    return userData.value?.image || defaultAvatar;
  });

  return {
    isLoggedIn,
    isEmailVerified,
    userData,
    refreshTokenIntervalId,
    userImage,
  };
});
