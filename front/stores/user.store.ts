import type { UserData } from "~/types";

export const useUserStore = defineStore("user", () => {
  const userData = ref<UserData>({} as UserData);
  const refreshTokenIntervalId = ref();

  const isLoggedIn = computed(() => !!userData.value.accessToken);
  const isEmailVerified = computed(() => userData.value.emailVerified);
  return {
    isLoggedIn,
    isEmailVerified,
    userData,
    refreshTokenIntervalId,
  };
});
