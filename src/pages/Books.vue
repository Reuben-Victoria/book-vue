<script setup lang="ts">
import { computed, onMounted } from "vue";
import BookCard from "../components/BookCard.vue";
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
import BookCardSkeleton from "../components/loaders/BookCardSkeleton.vue";
import { useCartStore } from "../store/useCartStore";

const cartStore = useCartStore();

const paginateBooks = computed(() => cartStore.paginateBooks);
const searchBooks = computed(() => cartStore.searchBooks);

console.log(cartStore.isPending, "PENDING");

onMounted(() => {
  cartStore.getAllbooks();
});
</script>
<template>
  <div class="books">
    <div class="books-filter">
      <h2>Books</h2>
      <Search
        class="books-search"
        @onChange="cartStore.updateQuery({ search: cartStore.query.search })"
        :value="cartStore.query.search"
      />
    </div>
    <div class="books-content">
      <div
        v-if="cartStore.isPending && !(!paginateBooks?.length! || !searchBooks?.length!)"
        class="books-content-main"
      >
        <BookCardSkeleton
          v-for="_ in Array.from({ length: 9 })"
          key="{index}"
        />
      </div>

      <div
        class="books-content-main"
        v-if="(!!paginateBooks?.length! || !!searchBooks?.length!) && !cartStore.isPending "
      >
        <BookCard
          v-for="books in cartStore.query?.search ? searchBooks : paginateBooks"
          :key="books?.id"
          :books="books"
          @addToBag="cartStore.addToCart(books)"
        />
      </div>
      <Pagination v-if="!!paginateBooks?.length! || !!searchBooks?.length!" />

      <div
        v-if="
        !paginateBooks?.length!
        &&
        !cartStore.isPending
        &&
        !searchBooks?.length"
      >
        <p class="books-not-found">No book <span>found!</span></p>
      </div>
    </div>
  </div>
</template>
