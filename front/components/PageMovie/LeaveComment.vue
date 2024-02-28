<script setup>
const comment = ref("");
const { userImage } = storeToRefs(useUserStore());
const route = useRoute();
const axios = useAxios();

const submitComment = async () => {
  // console.log('route params:', route.params)
  try {
    const response = await axios.post(
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
    console.log("Post request successful", response.data);
  } catch (error) {
    console.error(error);
  }
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
      <Textarea
        v-model="comment"
        class="w-full"
        auto-resize
        rows="5"
        cols="300"
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
