<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import Button from "./Button.vue";
import { defineProps } from "vue";

type Props = {
  /**
   * current page
   */
  page: number;
  total_pages: number;
  /**
   * meta
   * @default - { page: 1 }
   */
  /**
   * on page change
   * @param page
   * @default 1
   */
  //   setLimit: (limit: number) => void;
  //   onPageChange: (page: number) => void;
};

defineProps<Props>();

defineEmits(["onPageChange"]);
const pages = [10, 25, 50, 100];
</script>

<template>
  <div class="pagination">
    <div class="pagination-rows">
      <p class="pagination-text">Items per page</p>
      <select data-testid="pagination-limit" class="pagination-select">
        <option v-for="page in pages" key="{page}" :value="page">
          {{ page }}
        </option>
      </select>
    </div>
    <div class="pagination-buttons">
      <p class="pagination-page-info">
        Page {{ `${page}` }} of
        {{ isNaN(total_pages) ? 0 : total_pages }}
      </p>
      <Button
        class="pagination-button"
        type="button"
        data-testid="pagination-prev"
        variant="outlined"
        size="small"
        :disabled="page === 1"
        @click="$emit('onPageChange', page - 1)"
      >
        <Icon icon="ph:caret-left" fontSize="16" />
      </Button>
      <Button
        class="pagination-button"
        type="button"
        size="small"
        :disabled="total_pages === page"
        variant="primary"
        @click="$emit('onPageChange', page + 1)"
      >
        <Icon icon="ph:caret-right" fontSize="16" />
      </Button>
    </div>
  </div>
</template>
