<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ description: string; price: number }>();
</script>

<template>
  <div className="cart-checkout-element">
    <span>{{ description }}</span>
    <p>${{ price.toFixed(2) }}</p>
  </div>
</template>
