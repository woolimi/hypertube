<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const axios = useAxios();
const route = useRoute();
const comment = ref("");
console.log(route.params, props, props.item.id);
const updateComment = async () => {
  try {
    const response = await axios.put(`comments/${props.item.id}/update`, {
      content: comment.value,
    });
    console.log("comment update request successful", response.data);
  } catch (error) {
    console.error(error);
  }
};
const deleteComment = async () => {
  try {
    const response = await axios.delete(`comments/${props.item.id}/delete`);
    console.log("comment delete request successful", response.data);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="flex gap-3">
    <NuxtLink :to="localePath({ name: 'users-uid', params: { uid: 123 } })">
      <Avatar
        :image="item.User.image"
        class="shrink-0 overflow-hidden"
        size="large"
        shape="circle"
      />
    </NuxtLink>
    <aside>
      <p class="text-primary-400">{{ item.User.username }}</p>
      <!-- TODO: long text handling -->
      <p>{{ item.content }}</p>
    </aside>
  </div>
  <div class="text-right">
    <!-- TODO: get new contents to update-->
    <button
      class="rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700"
      @click="updateComment"
    >
      update
    </button>
    <button
      class="rounded bg-red-500 px-4 py-2 font-bold hover:bg-red-700"
      @click="deleteComment"
    >
      delete
    </button>
  </div>
</template>
