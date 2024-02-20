import type { AxiosInstance } from "axios";

import type { UserData } from "~/types";

export const useAuth = () => {
  const { userData } = storeToRefs(useUserStore());
  const refreshTokenIntervalId = ref();
  const tokenDurationMins = Number(
    useRuntimeConfig().public.JWT_ACCESS_DURATION,
  );

  const refreshToken = async (api: AxiosInstance) => {
    try {
      const { data } = await api.post("/auth/refresh");
      userData.value = data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const startRefreshAuth = (api: AxiosInstance) => {
    refreshTokenIntervalId.value = setInterval(
      () => refreshToken(api),
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
    startRefreshAuth(api);
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
    startRefreshAuth(api);
  };

  const onGoogleLogin = () =>
    (window.location.href = `${useRuntimeConfig().public.BACK_HOST}/auth/google/login`);
  const onFtLogin = () =>
    (window.location.href = `${useRuntimeConfig().public.BACK_HOST}/auth/ft/login`);
  const onGithubLogin = () => {
    window.location.href = `${useRuntimeConfig().public.BACK_HOST}/auth/github/login`;
  };

  return {
    refreshToken,
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
