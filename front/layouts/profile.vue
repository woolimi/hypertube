<template>
  <TheNavbar />
  <main
    class="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-slate-900 px-4 pb-32 pt-[112px] lg:p-8 lg:pt-[112px]"
  >
    <slot />
  </main>
  <TheFooter />
</template>
