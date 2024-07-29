<script setup lang="ts">
import { CartItemProps } from "../../types/cart";

const props = defineProps<CartItemProps>();

const emit = defineEmits(["updateQuantity", "removeFromCart"]);

const handleQuantityChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(target.value, "TARGET");
  emit("updateQuantity", { id: props.id, quantity: Number(target.value) });
};
</script>

<template>
  <div class="cartitem">
    <div class="cartitem-container">
      <div class="cartitem-cover">
        <img src="/book.jpeg" alt="book-jpeg" />
      </div>
      <div class="cartitem-responsive">
        <div class="cartitem-details">
          <p>{{ name }}</p>
          <span>{{ publisher }}</span>
        </div>

        <div class="cartitem-details-actions">
          <input
            type="number"
            name="id.toString()"
            :value="props.quantity"
            v-on:input="handleQuantityChange"
          />

          <button @click="$emit('removeFromCart')">Remove</button>
        </div>
      </div>
    </div>
    <div class="cartitem-actions">
      <input
        name="id.toString()"
        type="number"
        :value="props.quantity"
        v-on:input="handleQuantityChange"
      />
      <button @click="$emit('removeFromCart')">Remove</button>
    </div>

    <p class="cartitem-price">${{ price }}.00</p>
  </div>
</template>
