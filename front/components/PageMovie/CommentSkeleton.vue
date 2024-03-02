<script setup lang="ts">
import defaultAvatar from "~/assets/images/default_user.webp";
</script>

<template>
  <div class="flex gap-3">
    <Avatar
      :image="defaultAvatar"
      class="shrink-0 overflow-hidden"
      size="large"
      shape="circle"
    />
    <aside class="comment-content">
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
    </aside>
  </div>
</template>

<style scoped>
.comment-content {
  width: 100%;
  display: block;
}
</style>
