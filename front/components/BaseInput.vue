<script setup>
import { useVModels } from "@vueuse/core";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});
const emit = defineEmits(["update:modelValue"]);
const { modelValue } = useVModels(props, emit);
const id = useIdStore().get();
</script>

<template>
  <div class="flex flex-col gap-1 text-left">
    <label :for="id">{{ label }}</label>
    <InputText :id="id" v-model="modelValue" :type="type" />
  </div>
</template>
