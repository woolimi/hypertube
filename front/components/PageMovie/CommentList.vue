<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="mx-auto my-20 flex max-w-[760px] flex-col gap-3 px-4">
    <h2 class="mb-3 text-3xl font-bold text-primary-400">
      Comments <span class="text-xl text-white">({{ items.length }})</span>
    </h2>
    <LeaveComment />
    <div v-for="(item, idx) in items" :key="idx" :item="item">
      <Comment :item="item" />
      <SubComment
        v-for="(subItem, idx2) in item.comments"
        :key="idx2"
        :item="subItem"
      />
    </div>
  </section>
</template>
