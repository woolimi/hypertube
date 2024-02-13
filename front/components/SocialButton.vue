<template>
  <button
    aria-label="42 login"
    :class="$style.social"
    class="flex shrink-0 items-center justify-center p-4"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" module>
.social {
  @apply rounded-[50%] fill-primary-400 text-primary-400;

  &:hover {
    @apply bg-primary-300 bg-opacity-20 text-primary-300;

    svg {
      @apply fill-primary-300;
    }
  }
}
</style>
