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
          class="bg-green-500 hover:bg-green-700"
          :class="$style.buttonCircle"
          @click="updateComment"
        >
          <i class="pi pi-check" :class="$style.iconCenter"></i>
          <!-- save -->
        </button>
        <button
          class="bg-gray-500 hover:bg-gray-700"
          :class="$style.buttonCircle"
          @click="cancelEdit"
        >
          <i class="pi pi-times" :class="$style.iconCenter"></i>
          <!-- cancel -->
        </button>
      </div>
    </div>
  </form>
</template>

<style module>
.iconCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.buttonCircle {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}
</style>
