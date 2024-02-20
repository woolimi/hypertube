export default defineNuxtPlugin(async () => {
  const auth = useAuth();
  const { userData, isLoggedIn } = storeToRefs(useUserStore());

  if (process.server) {
    userData.value.accessToken = useCookie("accessToken").value as string;
    if (userData.value.accessToken && !userData.value.username) {
      await auth.doRefreshTokenServer();
    }
  }

  if (process.client && userData.value.accessToken) {
    auth.startRefreshAuth();

    window.onfocus = () => {
      if (isLoggedIn.value) {
        auth.doRefreshTokenClient();
        auth.startRefreshAuth();
      }
    };
    window.onblur = () => {
      if (isLoggedIn.value) {
        auth.stopRefreshAuth();
      }
    };
  }
});
