<script setup>
import { useCommentStore } from "~/stores/comment.store";

const comment = ref("");
const visible = ref(false);
const { userImage } = storeToRefs(useUserStore());
const { maxCommentLength } = useCommentStore();
const route = useRoute();
const axios = useAxios();
const emit = defineEmits(["create"]);

const submitComment = async () => {
  try {
    // console.log("submitComment", comment.value.length, maxCommentLength);
    if (0 < comment.value.length && comment.value.length <= maxCommentLength) {
      const { data } = await axios.post(
        "comments/create",
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
      comment.value = "";
    } else {
    //   console.log("max error", comment.value.length);
      visible.value = true;
    //   console.log("visible:", visible.value);
    }
  } catch (error) {
    console.error(error);
    comment.value = "";
  }
};
const getComment = (c) => {
  console.log("getcomment", c);
  comment.value = c;
};
const onShowDialog = (value) => {
  visible.value = value;
};
</script>

<template>
  <form class="flex gap-4" @submit.prevent="submitComment">
    <Avatar
      :image="userImage"
      class="shrink-0 overflow-hidden"
      size="large"
      shape="circle"
    />
    <div>
      <CommentTextarea
        :content="comment"
        :visible-value="visible"
        @input="getComment"
        @show-dialog="onShowDialog"
      />
      <div class="text-right">
        <Button
          label="Write a comment"
          class="w-full !px-3 !py-2 sm:w-fit"
          type="submit"
        />
      </div>
    </div>
  </form>
</template>
