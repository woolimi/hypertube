<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  toggleEdit: {
    type: Function,
    default: () => {},
  },
});
console.log(props.item);
const axios = useAxios();
const comment = ref(props.item.content);

const editSave = async () => {
  try {
    const response = await axios.put(`comments/${props.item.id}/update`, {
      content: comment.value,
    });
    console.log("comment update request successful", response.data);
    props.toggleEdit();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <form class="flex gap-4" @submit.prevent="editComment">
    <div>
      <Textarea
        v-model="comment"
        class="w-full"
        auto-resize
        rows="5"
        cols="300"
      />
      <div class="text-right">
        <button
          class="rounded bg-green-500 px-4 py-2 font-bold hover:bg-green-700"
          @click="editSave"
        >
          save
        </button>
        <button
          class="rounded bg-gray-500 px-4 py-2 font-bold hover:bg-gray-700"
          @click="toggleEdit"
        >
          cancel
        </button>
      </div>
    </div>
  </form>
</template>
