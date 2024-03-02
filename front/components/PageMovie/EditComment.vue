<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
const axios = useAxios();
const emit = defineEmits(["cancel", "update"]);
const content = ref(props.item.content);
const { MAX_COMMENT_LENGTH } = useConstant();

const cancelEdit = () => {
  emit("cancel");
};
const errorMessage = ref("");
const { t } = useI18n();

const updateComment = async () => {
  if (!content.value.length || content.value.length > MAX_COMMENT_LENGTH)
    return;

  try {
    await axios.patch(`comments/${props.item.id}`, {
      content: content.value,
    });
  } catch (error) {
    errorMessage.value = t("Error.GENERAL_ERROR");
  }

  emit("update", {
    ...props.item,
    content: content.value,
  });
};
</script>

<template>
  <form @submit.prevent="updateComment">
    <div class="mt-2">
      <CommentTextarea v-model="content" :error="!!errorMessage" />
      <p v-if="errorMessage" class="mb-2 text-center text-red-500">
        {{ errorMessage }}
      </p>
    </div>

    <div class="flex justify-end gap-1">
      <button
        class="bg-green-500 hover:bg-green-700"
        :class="$style.buttonCircle"
        type="submit"
        @click="updateComment"
      >
        <!-- save -->
        <i class="pi pi-check" :class="$style.iconCenter"></i>
      </button>

      <button
        class="bg-gray-500 hover:bg-gray-700"
        :class="$style.buttonCircle"
        type="button"
        @click="cancelEdit"
      >
        <!-- cancel -->
        <i class="pi pi-times" :class="$style.iconCenter"></i>
      </button>
    </div>
  </form>
</template>

<style module>
.iconCenter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.buttonCircle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
</style>
