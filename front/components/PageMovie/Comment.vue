<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="flex gap-3">
    <NuxtLink :to="localePath({ name: 'users-uid', params: { uid: 123 } })">
      <Avatar
        :image="item.User.image"
        class="shrink-0 overflow-hidden"
        size="large"
        shape="circle"
      />
    </NuxtLink>
    <aside>
      <p class="text-primary-400">{{ item.User.username }}</p>
      <p>{{ item.content }}</p>
    </aside>
  </div>
</template>
