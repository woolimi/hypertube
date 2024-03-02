<template>
  <div class="flex gap-3">
    <Skeleton shape="circle" size="48px" />
    <aside class="comment-content">
      <Skeleton width="100px" class="mb-2"></Skeleton>
      <Skeleton height="3rem" class="mb-2"></Skeleton>
    </aside>
  </div>
</template>

<style scoped>
.comment-content {
  display: block;
  width: 100%;
}
</style>
