<script setup lang="ts">
import { defineProps } from "vue";

interface ButtonProps {
  variant: "primary" | "secondary" | "outlined" | "disabled";
  size: "small" | "medium" | "large";
  className: string
}

defineProps<Partial<ButtonProps>>();

const buttonClass = {
  primary: "button--primary",
  secondary: "button--secondary",
  outlined: "button--outlined",
  disabled: "button--disabled",
  small: "button--small",
  medium: "button--medium",
  large: "button--large",
};
</script>

<template>
  <button :class="[`${buttonClass[size!]}`, `${buttonClass[variant!]}`, `${className!}`]">
    <slot></slot>
  </button>
</template>
