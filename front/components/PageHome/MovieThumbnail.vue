<script setup>
const localePath = useLocalePath();
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <NuxtLink
    :to="localePath({ name: 'movie-mid', params: { mid: item.mid } })"
    class="relative"
    :class="$style.link"
  >
    <figure class="w-full">
      <img :src="item.image" class="w-full object-cover" />
    </figure>
    <div
      :class="$style.overlay"
      class="flex flex-col items-center justify-center p-4"
    >
      <p class="text-xl font-extrabold">{{ item.title }}</p>
      <p class="flex items-center gap-1">
        <i class="pi pi-star-fill text-sm text-primary-300"> </i>
        <span class="translate-y-[1px]">{{ item.score }}</span>
      </p>
    </div>
  </NuxtLink>
</template>

<style lang="scss" module>
.overlay {
  @apply bg-black bg-opacity-50 transition-all duration-300;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  opacity: 0;
  content: "";
}

.link:hover {
  .overlay {
    opacity: 100;
  }
}
</style>
