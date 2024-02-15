export const useUserStore = defineStore("user", () => {
  const accessToken = useCookie("accessToken", {
    maxAge: 1000 * 60 * 15, // 15 minutes
  });
  const refreshToken = useCookie("refreshToken", {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  const isLoggedIn = ref(false);

  return { isLoggedIn, accessToken, refreshToken };
});
