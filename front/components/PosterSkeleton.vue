<script setup>
import DarthVader from "~/assets/icons/darth-vader.svg";
</script>
<template>
  <div class="relative flex h-0 bg-gray-800 pb-[150%]" :class="$style.blink">
    <DarthVader
      class="absolute left-1/2 top-1/2 z-10 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2"
    />
  </div>
</template>
<style module>
@keyframes blink-effect {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.9;
  }

  100% {
    opacity: 0.6;
  }
}

.blink {
  animation: blink-effect ease-in-out 2s infinite;
}
</style>
