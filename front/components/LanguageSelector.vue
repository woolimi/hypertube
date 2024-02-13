<script setup>
import { onClickOutside } from "@vueuse/core";

import EnFlag from "~/assets/images/en.svg";
import FrFlag from "~/assets/images/fr.svg";

const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();
const options = [
  { name: "English", value: "en" },
  { name: "Français", value: "fr" },
];
const currentLangFlag = computed(() => {
  return locale.value === "fr" ? FrFlag : EnFlag;
});

const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const target = ref(null);

onClickOutside(target, () => {
  showDropdown.value = false;
});
</script>

<template>
  <div ref="target" class="relative">
    <Button rounded text @click.stop="toggleDropdown">
      <component :is="currentLangFlag" class="h-6 w-6 fill-primary-400" />
    </Button>

    <ul
      v-if="showDropdown"
      :class="$style.dropdown"
      class="absolute left-0 top-full flex flex-col gap-1 rounded-lg bg-white p-1 text-black"
    >
      <li v-for="option in options" :key="option.value">
        <NuxtLink
          :to="switchLocalePath(option.value)"
          class="flex w-full rounded-lg px-2 py-1 hover:bg-surface-200"
          @click.stop="() => (showDropdown = false)"
        >
          {{ option.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<style module>
.dropdown::before {
  position: absolute;
  bottom: 100%;
  left: 15px;
  display: block;
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
  border-left: 10px solid transparent;
  content: "";
}
</style>
