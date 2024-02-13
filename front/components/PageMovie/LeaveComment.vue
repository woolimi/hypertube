<script setup></script>
<template>
  <form class="flex gap-4" @submit.prevent="() => {}">
    <Avatar
      image="https://i.pravatar.cc/300?u=wpark"
      class="shrink-0 overflow-hidden"
      size="large"
      shape="circle"
    />
    <div>
      <Textarea
        v-model="value"
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
