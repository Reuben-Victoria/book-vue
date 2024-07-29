<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  tag: String,
});
</script>

<template>
  <div className="tag">{{ tag }}</div>
</template>
