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
    <Avatar
      :image="item.avatar"
      class="shrink-0 overflow-hidden"
      size="large"
      shape="circle"
    />
    <aside>
      <p class="text-primary-400">{{ item.username }}</p>
      <p>{{ item.content }}</p>
    </aside>
  </div>
</template>
