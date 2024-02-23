<script setup>
const comment = ref();
const { userData } = storeToRefs(useUserStore());
</script>

<template>
  <form class="flex gap-4" @submit.prevent="() => {}">
    <Avatar
      :image="userData.image"
      class="shrink-0 overflow-hidden"
      size="large"
      shape="circle"
    />
    <div>
      <Textarea
        v-model="comment"
        class="w-full"
        auto-resize
        rows="5"
        cols="300"
      />
      <div class="text-right">
        <Button label="Write a comment" class="w-full !px-3 !py-2 sm:w-fit" />
      </div>
    </div>
  </form>
</template>
