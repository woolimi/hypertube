export default defineNuxtPlugin(async () => {
  const api = useAxios();
  const auth = useAuth();
  const { userData, isLoggedIn } = storeToRefs(useUserStore());
  userData.value.accessToken = useCookie("accessToken").value as string;

  if (
    process.client &&
    userData.value.accessToken &&
    !userData.value.username
  ) {
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
