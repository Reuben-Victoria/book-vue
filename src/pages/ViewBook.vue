<script setup lang="ts">
import { onMounted } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useRoute } from "vue-router";
import ViewBookSkeleton from "../components/loaders/ViewBookSkeleton.vue";
import Button from "../components/Button.vue";
import Tags from "../components/Tags.vue";
import { useCartStore } from "../store/useCartStore";

const route = useRoute();

const id = route.params.id;

const {
  viewBook: data,
  getBookById,
  addToCart,
  isFetching: isPending,
} = useCartStore();

console.log(isPending, "ISPENDING");

onMounted(async () => {
  await getBookById(id! as string);
});
</script>

<template>
  <ViewBookSkeleton v-if="!!isPending" />

  <div v-else class="view">
    <div class="view-info">
      <h2 class="view-name">{{ data?.Title }}</h2>
      <div class="view-review">
        <p>$50</p>
        <div class="view-rating">
          <div class="view-rating-icons">
            <Icon
              v-for="(_, index) in Array.from({ length: 4 })"
              icon="ph:star-fill"
              :key="index"
            />

            <Icon icon="ph:star-half-fill" />
          </div>

          <span>1624 reviews</span>
        </div>
      </div>
      <div class="view-publisher">
        <p class="view-publisher-name">{{ data?.Publisher }}</p>
        <span>{{ data?.Year }}</span>
        <span>{{ data?.ISBN }}</span>
      </div>

      <p class="view-notes" v-if="data?.Notes?.[0] !== ''">
        <span v-for="notes in data?.Notes">{{ notes }}</span>
      </p>

      <div class="view-stock">
        <Icon icon="ph:check-bold" class="view-stock-icon" />
        <p>In stock and ready to ship</p>
      </div>

      <div v-if="data?.villains?.length" class="view-villains">
        <h4>Villains</h4>

        <div class="view-tags">
          <Tags
            v-for="(items, index) in data?.villains"
            :tag="items?.name"
            :key="index"
          />
        </div>
      </div>

      <Button variant="primary" size="medium" :onclick="addToCart(data!)">
        Add to bag
      </Button>
      <div class="view-guarantee">
        <Icon icon="ph:shield-check" class="view-guarantee-icon" />
        <p>Lifetime Guarantee</p>
      </div>
    </div>
    <div class="view-image">
      <img src="/book.jpeg" alt="Book" />
    </div>
  </div>
</template>
