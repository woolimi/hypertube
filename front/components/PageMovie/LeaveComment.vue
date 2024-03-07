<script setup>
const emit = defineEmits(["create"]);
const { t } = useI18n();
const route = useRoute();
const axios = useAxios();
const { userImage, userData } = storeToRefs(useUserStore());
const comment = ref("");
const { MAX_COMMENT_LENGTH } = useConstant();
const errorMessage = ref("");
const submitComment = async () => {
  if (!comment.value.length || comment.value.length > MAX_COMMENT_LENGTH)
    return;

  try {
    const { data } = await axios.post(
      "comments",
      {
        content: comment.value,
      },
      {
        params: {
          movieId: route.params.mid,
        },
      },
    );
    emit("create", data);
    errorMessage.value = "";
    comment.value = "";
  } catch (error) {
    console.error(error);
    errorMessage.value = t("Error.GENERAL_ERROR");
  }
};
</script>

<template>
  <form class="flex gap-4" @submit.prevent="submitComment">
    <NuxtLink
      :to="localePath({ name: 'users-uid', params: { uid: userData.id } })"
    >
      <Avatar
        :image="userImage"
        class="shrink-0 overflow-hidden"
        size="large"
        shape="circle"
      />
    </NuxtLink>
    <div>
      <CommentTextarea
        v-model="comment"
        :maxlength="MAX_COMMENT_LENGTH"
        :error="!!errorMessage"
      />
      <div class="text-right">
        <p v-if="errorMessage" class="mb-2 text-center text-red-500">
          {{ errorMessage }}
        </p>
        <Button
          class="w-full !px-3 !py-2 sm:w-fit"
          type="submit"
          :disabled="!comment.length"
        >
          {{ $t("Movie.Comment.writeButton") }}
        </Button>
      </div>
    </div>
  </form>
</template>
