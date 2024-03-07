<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";

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
const axios = useAxios();
const isFetching = ref(false);
const confirm = useConfirm();
const { t } = useI18n();

onMounted(async () => {
  try {
    isFetching.value = false;
    const { data: commentData } = await axios.get("/comments/", {
      params: {
        movieId: props.mid,
      },
    });
    comments.value = commentData || [];
  } catch (e) {
    console.error(e);
  } finally {
    isFetching.value = true;
  }
});

const onCreate = (comment: CommentData) => {
  comments.value.push(comment);
};
const onDelete = (comment: CommentData) => {
  const idx = comments.value.findIndex(
    (item: CommentData) => item.id === comment.id,
  );
  comments.value.splice(idx, 1);
};

const onEdit = (comment: CommentData) => {
  const _comments = [...comments.value];
  const idx = _comments.findIndex((item) => item.id === comment.id);
  _comments[idx] = comment;
  comments.value = _comments;
  editingComment.value = undefined;
};

const openEditConfirm = () => {
  confirm.require({
    message: t("Movie.Comment.commentLoseAlert"),
    header: t("Movie.Comment.commentLoseAlertTitle"),
    accept: () => {
      editingComment.value = pendingComment.value;
    },
  });
};
const onStartEdit = (comment: CommentData | undefined) => {
  pendingComment.value = comment;
  if (editingComment.value) {
    openEditConfirm();
  } else {
    editingComment.value = comment;
  }
};

const onCancelEdit = () => {
  editingComment.value = undefined;
};
</script>

<template>
  <section class="mx-auto my-20 flex max-w-[760px] flex-col gap-3 px-4">
    <h2 class="mb-3 text-3xl font-bold text-primary-400">
      {{ $t("Movie.Comment.Comments") }}
      <span class="text-xl text-white">({{ comments.length }})</span>
    </h2>
    <LeaveComment @create="onCreate" />

    <!-- TODO: pagenation -->
    <template v-if="!isFetching">
      <CommentSkeleton v-for="(item, idx) in 3" :key="idx" />
    </template>
    <template v-else>
      <div v-for="(item, idx) in comments" :key="idx" :item="item">
        <Comment
          :item="item"
          :is-editing="editingComment?.id === item.id"
          @delete="onDelete"
          @edit="onEdit"
          @start-edit="onStartEdit"
          @cancel-edit="onCancelEdit"
        />
      </div>
    </template>

    <ConfirmDialog :style="{ width: '95vw', maxWidth: '400px' }">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="rounded-lg bg-gray-200 p-6 text-black">
          <p class="mb-3 text-center text-3xl font-extrabold">
            {{ message.header }}
          </p>

          <p class="text-center text-lg">{{ message.message }}</p>

          <div class="mt-4 flex gap-2">
            <Button
              :label="$t('Movie.Comment.Continue')"
              class="flex-1"
              @click="acceptCallback"
            />
            <Button
              :label="$t('Movie.Comment.KeepEditing')"
              severity="secondary"
              class="flex-1"
              @click="rejectCallback"
            />
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </section>
</template>
