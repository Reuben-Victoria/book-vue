<script setup lang="ts">
import { CartItemProps } from "../../types/cart";
import { formatAmount } from "../../utils";

const props = defineProps<CartItemProps>();

const emit = defineEmits(["updateQuantity", "removeFromCart"]);

const handleQuantityChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  let newValue = Number(target.value);

  if (newValue < 1) {
    newValue = 1;
    target.value = newValue.toString();
  }
  emit("updateQuantity", (props.id, newValue));
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
            @input="handleQuantityChange"
          />

          <button @click="$emit('removeFromCart')">Remove</button>
        </div>
      </div>
    </div>
    <div class="cartitem-actions">
      <input
        :name="id.toString()"
        type="number"
        :value="props.quantity"
        @input="handleQuantityChange"
      />
      <button @click="$emit('removeFromCart')">Remove</button>
    </div>

    <p class="cartitem-price">${{ formatAmount(price, 2) }}</p>
  </div>
</template>
