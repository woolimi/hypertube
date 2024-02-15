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
        :image="item.avatar"
        class="shrink-0 overflow-hidden"
        size="large"
        shape="circle"
      />
    </NuxtLink>
    <aside>
      <p class="text-primary-400">{{ item.username }}</p>
      <p>{{ item.content }}</p>

      <div class="p-buttonset flex justify-end">
        <button severity="info" class="rounded-l-md bg-green-600 px-3 py-2">
          <i class="pi pi-pencil"></i>
        </button>
        <button severity="danger" class="rounded-r-md bg-red-600 px-3 py-2">
          <i class="pi pi-trash"></i>
        </button>
      </div>
    </aside>
  </div>
</template>
