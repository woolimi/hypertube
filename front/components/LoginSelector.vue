<script setup>
import { onClickOutside } from "@vueuse/core";

const localePath = useLocalePath();
const options = ref([
  {
    name: "Login",
    value: "auth-login",
  },
  {
    name: "Register",
    value: "auth-register",
  },
]);
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
    <Button
      rounded
      text
      icon="pi pi-user"
      aria-label="User Login"
      @click.stop="toggleDropdown"
    />
    <ul
      v-if="showDropdown"
      :class="$style.dropdown"
      class="absolute right-0 top-[calc(100%+10px)] flex min-w-[100px] flex-col gap-1 rounded-lg bg-white p-1 text-black"
    >
      <li v-for="option in options" :key="option.value">
        <NuxtLink
          :to="localePath(option.value)"
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
  right: 15px;
  bottom: 100%;
  display: block;
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
  border-left: 10px solid transparent;
  content: "";
}
</style>
