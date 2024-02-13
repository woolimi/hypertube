<script setup></script>

<template>
  <NuxtLink
    class="cursor-pointer text-primary-500 underline hover:text-primary-400"
    v-bind="$attrs"
  >
    <slot />
  </NuxtLink>
</template>
