<script setup lang="ts">
import { defineProps } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";

defineProps({
  size: String,
  className: String,
  value: String,
});

const emit = defineEmits(['onChange'])

const computedSizes: Record<string, any> = {
  small: "",
  medium: "search-size-medium",
  default: "search-size-default",
};

const computedInputClass: Record<string, any> = {
  small: "search-input-small",
  medium: "search-input-medium",
  default: "search-input-default",
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('onChange', target.value);
};
</script>

<template>
  <div :class="['search-container', `${computedSizes[size!]}`, `${className}`]">
    <span className="search-icon-left">
      <Icon icon="ph:magnifying-glass" />
    </span>
    <input
      :value="value"
      placeholder="Search..."
      @input="handleInput"
      :class="['search', `${computedInputClass[size!]}`]"
      type="text"
    />
  </div>
</template>
