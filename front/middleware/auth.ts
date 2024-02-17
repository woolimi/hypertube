export default defineNuxtRouteMiddleware(() => {
  if (process.client) return;

  // Try login

  // If not logged in, redirect to login page

  // If logged in, but emailVerified = false, redirect to verify-email page

  // If logged in and email verified, continue
});
