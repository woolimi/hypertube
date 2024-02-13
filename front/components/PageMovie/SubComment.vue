<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <Comment :item="item" class="ml-14 mt-2" />
</template>
