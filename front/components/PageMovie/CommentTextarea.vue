<script setup>
import { useCommentStore } from "~/stores/comment.store";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  visibleValue: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(props.visibleValue);
const content = ref(props.content);
const { maxCommentLength } = useCommentStore();
const emit = defineEmits(["input", "show-dialog"]);
const emitInput = () => {
  emit("input", content.value);
};
const handleDialogHide = () => {
  console.log("handleDialogHide");
  visible.value = false;
  emit("show-dialog", false);
};
watch(
  () => props.visibleValue,
  (newValue) => {
    visible.value = newValue;
  },
);
</script>

<template>
  <div class="textarea-container">
    <Textarea
      v-model="content"
      class="w-full"
      auto-resize
      rows="5"
      cols="300"
      @input="emitInput"
    />
    <span class="message-length"
      >{{ content.length }} / {{ maxCommentLength }}</span
    >
  </div>
  <!-- {{ visible }}
  {{ visibleValue }} -->
  <Dialog
    v-model:visible="visible"
    class="font-bold text-primary-400"
    modal
    header="                                            "
    :style="{ width: '25rem' }"
    :onHide="handleDialogHide"
  >
  <!-- TODO: 린트에 의해서 onHide가 on-hide로 바뀌는면서 동작을 하지않음 -->
    <span class="mb-5 block text-primary-400"
      >Content must be longer than or equal to 1 characters and at most 150
      characters.
    </span>
  </Dialog>
</template>

<style scoped>
.textarea-container {
  position: relative;
  display: inline-block;
}
.message-length {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px;
  color: gray;
  font-size: 12px;
}
</style>
