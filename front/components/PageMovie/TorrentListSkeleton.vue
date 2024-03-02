<template>
  <div :class="$style.gridContainer" class="mx-auto mt-8 max-w-[960px] px-4">
    <Skeleton height="4rem" width="w-full" />
    <Skeleton height="4rem" width="w-full" />
    <Skeleton height="4rem" width="w-full" />
    <Skeleton height="4rem" width="w-full" />
  </div>
</template>

<style module>
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  gap: 1rem;
}
</style>
