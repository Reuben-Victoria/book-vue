<script setup lang="ts">
import { onMounted, watch } from "vue";
import BookCard from "../components/BookCard.vue";
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
import BookCardSkeleton from "../components/loaders/BookCardSkeleton.vue";
import { useCartStore } from "../store/useCartStore";

const {
  searchBooks,
  paginateBooks,
  isPending,
  data,
  query,
  addToCart,
  updateQuery,
  getAllbooks,
} = useCartStore();

console.log(searchBooks, "SEARCH BOOKS");
console.log(paginateBooks, "PAGINATE BOOKS");

onMounted(() => {
  getAllbooks();
});

watch(
  () => query.search,
  () => {
    updateQuery({ search: query.search });
  }
);
</script>
<template>
  <div class="books">
    <div class="books-filter">
      <h2>Books</h2>
      <Search
        class="books-search"
        @onChange="updateQuery({ search: query.search })"
        :value="query.search"
      />
    </div>
    <div class="books-content">
      <div v-if="isPending" class="books-content-main">
        <BookCardSkeleton
          v-for="_ in Array.from({ length: 9 })"
          key="{index}"
        />
      </div>

      <div v-else="!isPending">
        <div v-if="!!paginateBooks?.length! || !!searchBooks?.length!">
          <div class="books-content-main">
            <BookCard
              v-for="books in query?.search ? searchBooks : paginateBooks"
              :key="books?.id"
              :books="books"
              @addToBag="addToCart(books)"
            />
          </div>
          <Pagination />
        </div>

        <div
          v-if="
        !paginateBooks?.length!
        &&
        !isPending
        &&
        !searchBooks?.length"
        >
          <p class="books-not-found">No book <span>found!</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
