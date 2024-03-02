<script setup lang="ts">
import { useCommentStore } from "~/stores/comment.store";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["cancel", "update"]);
const content = ref(props.item.content);
const { maxCommentLength } = useCommentStore();
const visible = ref(false);

const cancelEdit = () => {
  emit("cancel");
};

const updateComment = async () => {
//   console.log("editComment", content.value, maxCommentLength);
  if (content.value.length <= maxCommentLength) {
    emit("update", {
      ...props.item,
      content: content.value,
    });
  } else {
    // console.log("max length error", content.value.length);
    visible.value = true;
    // console.log("visible:", visible.value);
  }
  //   comment.value = "";
};
const getComment = (c: string) => {
  content.value = c;
};
const onShowDialog = (value) => {
  visible.value = value;
};
</script>

<template>
  <form class="flex gap-4" @submit.prevent="editComment">
    <div>
      <CommentTextarea
        :content="content"
        :visible-value="visible"
        @input="getComment"
        @show-dialog="onShowDialog"
      />
      <div class="submit-button text-right">
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
