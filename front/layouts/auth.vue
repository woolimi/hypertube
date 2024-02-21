<script setup lang="ts">
const { userData } = storeToRefs(useUserStore());
const { t } = useI18n();
const registrationSteps = computed(() => [
  {
    label: t("AuthRegister.Stepper.step1"),
    value: 0,
  },
  {
    label: t("AuthRegister.Stepper.step2"),
    value: 1,
  },
  {
    label: t("AuthRegister.Stepper.step3"),
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
</script>
<template>
  <TheNavbar />
  <main
    class="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-slate-900 px-4 pb-32 pt-[112px] lg:p-8 lg:pt-[112px]"
  >
    <div class="w-full max-w-[540px]">
      <Steps :model="registrationSteps" :active-step="userRegistrationStatus" />
    </div>
    <slot />
  </main>
  <TheFooter />
</template>
