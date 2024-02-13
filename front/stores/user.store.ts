export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  return { isLoggedIn };
});
