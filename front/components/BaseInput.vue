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
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
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
      :class="{ '!border-red-500': error || errorMessage }"
    />
    <Transition name="fade">
      <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms ease-out;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
