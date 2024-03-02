<template>
  <div
    class="flex h-full flex-col gap-2 rounded-lg bg-surface-900 p-4 text-xl sm:p-8"
  >
    <div class="flex gap-4">
      <Skeleton height="2rem" class="flex-[1] pb-2" />
      <Skeleton height="2rem" class="flex-[4] pb-2" />
    </div>
    <div class="flex gap-4">
      <Skeleton height="2rem" class="flex-[1] pb-2" />
      <Skeleton height="2rem" class="flex-[4] pb-2" />
    </div>
    <div class="flex gap-4">
      <Skeleton height="2rem" class="flex-[1] pb-2" />
      <Skeleton height="2rem" class="flex-[4] pb-2" />
    </div>
    <div class="flex gap-4">
      <Skeleton height="2rem" class="flex-[1] pb-2" />
      <Skeleton height="2rem" class="flex-[4] pb-2" />
    </div>
    <div class="flex gap-4">
      <Skeleton height="2rem" class="flex-[1] pb-2" />
      <div class="flex flex-[4] flex-wrap gap-3">
        <Skeleton height="2rem" width="4rem" class="rounded-[20px] pb-2" />
        <Skeleton height="2rem" width="4rem" class="rounded-[20px] pb-2" />
        <Skeleton height="2rem" width="4rem" class="rounded-[20px] pb-2" />
      </div>
    </div>
    <Skeleton height="20rem" class="w-full pb-2"></Skeleton>
  </div>
</template>
