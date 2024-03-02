<script setup>
import { useVModels } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  maxlength: {
    type: Number,
    default: 300,
  },
  error: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const { modelValue } = useVModels(props, emit);
</script>

<template>
  <div class="relative">
    <Textarea
      v-model="modelValue"
      class="w-full"
      auto-resize
      :maxlength="maxlength"
      rows="5"
      cols="300"
      :class="{ 'border-2 !border-red-500': error }"
    />
    <span class="absolute bottom-1 right-1 p-1 text-sm text-gray-400">
      {{ modelValue.length }} / {{ maxlength }}
    </span>
  </div>
</template>
