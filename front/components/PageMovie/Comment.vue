<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  isEditing: {
    type: Boolean,
  },
  setIsEditing: {
    type: Function,
    default: () => {},
  },
});

const axios = useAxios();
const editState = ref(false);

const editComment = () => {
  // console.log('is editing:', props.isEditing, 'edit state:', editState.value)
  if (props.isEditing) {
    console.log(props.isEditing, "is editing");
	// TODO: update alert
    alert("You will lose any unsaved changes to your message.");
    return;
  }
  toggleEdit();
};

const toggleEdit = () => {
  editState.value = !editState.value;
  props.setIsEditing(editState.value);
  // console.log('is editing:', props.isEditing, 'edit state:', editState.value)
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
    <!-- TODO: long text handling -->
    <aside class="max-w-[760px]" style="width: 600px; word-wrap: break-word">
      <p class="text-primary-400">{{ item.User.username }}</p>
      <EditComment v-if="editState" :item="item" :toggle-edit="toggleEdit" />
      <p v-else>{{ item.content }}</p>
    </aside>
  </div>
  <!-- TODO: edit/delete only my comments -->
  <div v-if="!editState" class="text-right">
    <button
      class="rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700"
      @click="editComment"
    >
      edit
    </button>
    <button
      class="rounded bg-red-500 px-4 py-2 font-bold hover:bg-red-700"
      @click="deleteComment"
    >
      delete
    </button>
  </div>
</template>
