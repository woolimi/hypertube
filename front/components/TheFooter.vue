<script setup>
const year = new Date().getFullYear();
</script>
<template>
  <footer class="h-[64px] bg-black p-4 text-center">
    <p>© {{ year }} Hypertube. {{ $t("Footer.copyright") }}</p>
  </footer>
</template>
