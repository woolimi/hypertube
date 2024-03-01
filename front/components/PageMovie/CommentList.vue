<script setup lang="ts">
import type { CommentData } from "~/types";

const props = defineProps({
  mid: {
    type: String,
    required: true,
  },
});
const comments = ref<CommentData[]>([]);

const editingComment = ref<CommentData | undefined>();
const pendingComment = ref<CommentData | undefined>();
const visible = ref(false);
const axios = useAxios();
const isFetching = ref(true);

onMounted(async () => {
  try {
    const { data: commentData } = await axios.get("/comments/", {
      params: {
        movieId: props.mid,
      },
    });
    comments.value = commentData;
  } catch (e) {
    console.error(e);
  } finally {
    isFetching.value = false;
  }
});

const onCreate = (comment: CommentData) => {
  comments.value.push(comment);
};
const onDelete = (comment: CommentData) => {
  const idx = comments.value.findIndex((item) => item.id === comment.id);
  comments.value.splice(idx, 1);
};

const onEdit = (comment: CommentData) => {
  const _comments = [...comments.value];
  const idx = _comments.findIndex((item) => item.id === comment.id);
  _comments[idx] = comment;
  comments.value = _comments;
  editingComment.value = undefined;
};

const onStartEdit = (comment: CommentData | undefined) => {
  pendingComment.value = comment;
  if (editingComment.value) visible.value = true;
  else {
    editingComment.value = comment;
  }
};

const onCancelEdit = () => {
  visible.value = false;
  editingComment.value = undefined;
};

const onKeepEditing = () => {
  visible.value = false;
};

const onContinue = (comment: CommentData | undefined) => {
  visible.value = false;
  editingComment.value = comment;
};
</script>

<template>
  <section class="mx-auto my-20 flex max-w-[760px] flex-col gap-3 px-4">
    <h2 class="mb-3 text-3xl font-bold text-primary-400">
      Comments <span class="text-xl text-white">({{ comments.length }})</span>
    </h2>
    <LeaveComment @create="onCreate" />

    <div v-for="(item, idx) in comments" :key="idx" :item="item">
      <!-- TODO: pagenation -->
      <Comment
        :item="item"
        :is-editing="editingComment?.id === item.id"
        @delete="onDelete"
        @edit="onEdit"
        @start-edit="onStartEdit"
        @cancel-edit="onCancelEdit"
      />
    </div>
    <!-- <template v-if="!isFetching">
      <div></div>
    </template> -->
    <Dialog
      v-model:visible="visible"
      class="font-bold text-primary-400"
      modal
      header="Going somewhere else in Hypertube?"
      :style="{ width: '25rem' }"
    >
      <span class="mb-5 block text-primary-400"
        >You will lose any unsaved changes to your message.</span
      >
      <div class="justify-content-end text-right">
        <Button
          type="button"
          label="Keep Editing"
          severity="secondary"
          @click="onKeepEditing"
        ></Button>
        <Button
          type="button"
          label="Continue"
          @click="onContinue(pendingComment)"
        ></Button>
      </div>
    </Dialog>
  </section>
</template>
