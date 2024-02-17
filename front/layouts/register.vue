<script setup lang="ts">
const { registrationSteps, userRegistrationStatus } =
  storeToRefs(useUserStore());
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
