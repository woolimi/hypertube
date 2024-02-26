<script setup lang="ts"></script>
<template>
  <TheNavbar />
  <main
    class="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-slate-900 px-4 pb-32 pt-[92px] lg:p-8 lg:pt-[92px]"
  >
    <slot />
  </main>
  <TheFooter />
</template>
