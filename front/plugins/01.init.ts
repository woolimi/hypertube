export default defineNuxtPlugin(async () => {
  const auth = useAuth();
  const { userData, isLoggedIn } = storeToRefs(useUserStore());
  if (process.server) {
    userData.value.accessToken = useCookie("accessToken").value as string;
  }

  if (
    process.client &&
    userData.value.accessToken &&
    !userData.value.username
  ) {
    const api = useAxios();
    await auth.refreshToken(api);
    auth.startRefreshAuth(api);

    window.onfocus = () => {
      if (isLoggedIn.value) {
        auth.refreshToken(api);
        auth.startRefreshAuth(api);
      }
    };
    window.onblur = () => {
      if (isLoggedIn.value) {
        auth.stopRefreshAuth();
      }
    };
  }
});
