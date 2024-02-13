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
  placeholder: {
    type: String,
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: undefined,
  },
});
const emit = defineEmits(["update:modelValue"]);
const { modelValue } = useVModels(props, emit);
const id = useIdStore().get();
</script>

<template>
  <div class="flex flex-col gap-1 text-left">
    <label :for="id" class="text-primary-400">{{ label }}</label>
    <InputText
      :id="id"
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
    />
  </div>
</template>
