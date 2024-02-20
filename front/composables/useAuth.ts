import type { AxiosInstance } from "axios";

import type { UserData } from "~/types";

export const useAuth = () => {
  const BACK_HOST = useRuntimeConfig().public.BACK_HOST;
  const { userData } = storeToRefs(useUserStore());
  const refreshTokenIntervalId = ref();
  const tokenDurationMins = Number(
    useRuntimeConfig().public.JWT_ACCESS_DURATION,
  );

  const doRefreshTokenServer = async () => {
    if (userData.value.username) return;

    const cookie = useRequestHeaders(["cookie"]);
    try {
      const data: UserData = await $fetch(
        `http://back-nestjs:3005/auth/refresh`,
        {
          method: "POST",
          headers: {
            ...cookie,
            Authorization: `Bearer ${userData.value.accessToken}`,
          },
        },
      );
      userData.value = data || {};
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const doRefreshTokenClient = async () => {
    const axios = useAxios();
    try {
      const { data } = await axios.post(`/auth/refresh`);
      userData.value = data || {};
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const startRefreshAuth = () => {
    refreshTokenIntervalId.value = setInterval(
      () => doRefreshTokenClient(),
      (tokenDurationMins - 1) * 60 * 1000,
    );
  };

  const stopRefreshAuth = () => {
    clearInterval(refreshTokenIntervalId.value);
  };

  const doLogin = async (
    api: AxiosInstance,
    info: { username: string; password: string },
  ) => {
    const { data } = await api.post("/auth/login", {
      username: info.username,
      password: info.password,
    });
    userData.value = data;
    startRefreshAuth();
  };

  const doLogout = async (api: AxiosInstance) => {
    await api.post("/auth/logout");
    userData.value = {} as UserData;
    stopRefreshAuth();
  };

  const doRegister = async (
    api: AxiosInstance,
    info: UserData,
    lang: string,
  ) => {
    const { data } = await api.post(`/auth/register?lang=${lang}`, { ...info });
    userData.value = data;
    startRefreshAuth();
  };

  const onGoogleLogin = () =>
    (window.location.href = `${BACK_HOST}/auth/google/login`);
  const onFtLogin = () => (window.location.href = `${BACK_HOST}/auth/ft/login`);
  const onGithubLogin = () => {
    window.location.href = `${BACK_HOST}/auth/github/login`;
  };

  return {
    doRefreshTokenServer,
    doRefreshTokenClient,
    startRefreshAuth,
    stopRefreshAuth,
    doLogin,
    doLogout,
    doRegister,
    onGoogleLogin,
    onFtLogin,
    onGithubLogin,
  };
};
