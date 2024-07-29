<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import Button from "./Button.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { BookType } from "../types/books";

defineProps<{ books: Partial<BookType> }>();

defineEmits(['addToBag'])

const router = useRouter();
</script>

<template>
  <div class="card" @click="() => router.push(`/${books?.id}`)">
    <div class="card-details">
      <div class="card-wrapper">
        <div class="card-wrapper-image">
          <img src="./../../public/book.jpeg" alt="book" />
        </div>

        <div class="card-details-book">
          <div>
            <h4 class="card-title clamped-text">{{books?.Title}}</h4>
            <p class="card-author">{{books?.Publisher}}</p>
          </div>
          <p class="card-notes clamped-text" :title="books?.Notes![0]">
            {{books?.Notes![0]}}
          </p>
        </div>
      </div>

      <p class="card-details-year">{{books?.Year}}</p>
    </div>
    <div class="card-actions">
      <Button size="small" variant="outlined" @click.stop="$emit('addToBag')">
        <div>
          <Icon icon="ph:heart" class="icon-card" />
          <span>Add to Bag</span>
        </div>
      </Button>
    </div>
  </div>
</template>
