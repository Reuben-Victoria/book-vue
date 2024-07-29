<script setup lang="ts">
import { useCartStore } from "../store/useCartStore";
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import Button from "./Button.vue";

const cartStore = useCartStore();

const limits = ref([10, 25, 50, 100]);

const page = computed(() => cartStore.query.page);
const totalPages = computed(() => cartStore.totalPages);

const handleLimitChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  cartStore.updateQuery({ page: 1, limit: Number(target.value) });
};

const changePage = (newPage: number) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    cartStore.updateQuery({ page: newPage });
  }
};
</script>

<template>
  <div class="pagination">
    <div class="pagination-rows">
      <p class="pagination-text">Items per page</p>
      <select @change="handleLimitChange" class="pagination-select">
        <option v-for="limit in limits" :value="limit" :key="limit">
          {{ limit }}
        </option>
      </select>
    </div>
    <div class="pagination-buttons">
      <p class="pagination-page-info">
        Page {{ `${page}` }} of
        {{ isNaN(totalPages) ? 0 : totalPages }}
      </p>
      <Button
        class="pagination-button"
        type="button"
        data-testid="pagination-prev"
        variant="outlined"
        size="small"
        :disabled="page === 1"
        @click="changePage(page - 1)"
      >
        <Icon icon="ph:caret-left" fontSize="16" />
      </Button>
      <Button
        class="pagination-button"
        type="button"
        size="small"
        :disabled="totalPages === page"
        variant="primary"
        @click="changePage(page + 1)"
      >
        <Icon icon="ph:caret-right" fontSize="16" />
      </Button>
    </div>
  </div>
</template>
