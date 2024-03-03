<script setup lang="ts">
import type { PropType } from "vue";

import type { CommentData } from "~/types";

const props = defineProps({
  item: {
    type: Object as PropType<CommentData>,
    default: () => ({}),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const { userData } = storeToRefs(useUserStore());
const axios = useAxios();
const emit = defineEmits(["delete", "edit", "start-edit", "cancel-edit"]);
const localePath = useLocalePath();
const deleteComment = async () => {
  try {
    await axios.delete(`comments/${props.item.id}`);
    emit("delete", props.item);
  } catch (error) {
    console.error(error);
  }
};

const startEditComment = (c: CommentData) => {
  emit("start-edit", c);
};
const cancelEditComment = () => {
  emit("cancel-edit");
};
const updateComment = async (c: CommentData) => {
  emit("edit", c);
  emit("start-edit", undefined);
};
</script>

<template>
  <div class="mb-3">
    <div class="flex gap-3">
      <NuxtLink
        :to="localePath({ name: 'users-uid', params: { uid: item.User.id } })"
      >
        <Avatar
          :image="item.User.image"
          class="shrink-0 overflow-hidden"
          size="large"
          shape="circle"
        />
      </NuxtLink>
      <aside>
        <p class="text-primary-400">{{ item.User.username }}</p>
        <EditComment
          v-if="isEditing"
          :item="item"
          @cancel="cancelEditComment"
          @update="updateComment"
        />
        <p v-else :class="$style.commentBlock">{{ item.content }}</p>
      </aside>
    </div>

    <div
      v-if="!isEditing && userData.username == item.User.username"
      class="flex justify-end gap-1"
    >
      <button
        class="bg-blue-500 hover:bg-blue-700"
        :class="$style.buttonCircle"
        @click="startEditComment(item)"
      >
        <i class="pi pi-pencil" :class="$style.iconCenter"></i>
      </button>

      <button
        class="bg-red-500 hover:bg-red-700"
        :class="$style.buttonCircle"
        @click="deleteComment"
      >
        <i class="pi pi-trash" :class="$style.iconCenter"></i>
      </button>
    </div>
  </div>
</template>

<style module>
.commentBlock {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

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
