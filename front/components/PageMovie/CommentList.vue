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
  editingComment.value = comment;
};

watch(editingComment, (bef, aft) => {
  if (bef && aft) {
    // alert("You will lose any unsaved changes to your message.");
  }
});
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
      />
    </div>
    <!-- <template v-if="!isFetching">
      <div></div>
    </template> -->
  </section>
</template>
