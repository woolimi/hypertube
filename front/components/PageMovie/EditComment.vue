<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["cancel", "update"]);
const comment = ref(props.item.content);

const cancelEdit = () => {
  emit("cancel");
};

const updateComment = async () => {
  emit("update", {
    ...props.item,
    content: comment.value,
  });
  comment.value = "";
};
</script>

<template>
  <form class="flex gap-4" @submit.prevent="editComment">
    <div>
      <Textarea
        v-model="comment"
        class="w-full"
        auto-resize
        rows="5"
        cols="300"
      />
      <div class="text-right">
        <button
          class="rounded bg-green-500 px-4 py-2 font-bold hover:bg-green-700"
          @click="updateComment"
        >
          save
        </button>
        <button
          class="rounded bg-gray-500 px-4 py-2 font-bold hover:bg-gray-700"
          @click="cancelEdit"
        >
          cancel
        </button>
      </div>
    </div>
  </form>
</template>
