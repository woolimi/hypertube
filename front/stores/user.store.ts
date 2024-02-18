import type { UserData } from "~/types";

export const useUserStore = defineStore("user", () => {
  const userData = ref<UserData>({} as UserData);
  const refreshTokenIntervalId = ref();

  const isLoggedIn = computed(() => !!userData.value.accessToken);
  const registrationSteps = ref([
    {
      label: "Register",
      value: 0,
    },
    {
      label: "Verify email",
      value: 1,
    },
    {
      label: "Done",
      value: 2,
    },
  ]);
  const userRegistrationStatus = computed(() => {
    if (userData.value.emailVerified) {
      return registrationSteps.value[2].value;
    } else if (userData.value.accessToken) {
      return registrationSteps.value[1].value;
    } else {
      return registrationSteps.value[0].value;
    }
  });

  return {
    isLoggedIn,
    userData,
    registrationSteps,
    userRegistrationStatus,
    refreshTokenIntervalId,
  };
});
