<script setup lang="ts">
import CartItem from "./CartItem.vue";
import Button from "../Button.vue";
import Checkout from "./Checkout.vue";
import { useCartStore } from "../../store/useCartStore";
import { computed } from "vue";

const cartStore = useCartStore();

const cartData = computed(() => cartStore.cartData);

const totalPrice = computed(() => cartStore.totalPrice);

const handleUpdateQuantity = (id: number, quantity: number) => {
  cartStore.updateCartQuantity(id, quantity);
};

const checkoutData = [
  { description: "Subtotal", price: totalPrice.value },
  { description: "Shipping", price: 40 },
  { description: "Tax", price: 80 },
];
</script>

<template>
  <div class="cart">
    <div class="cart-action">
      <h2>Shopping <span class="cart-action-label">Bag</span></h2>
      <slot></slot>
    </div>

    <div class="cart-items hide-scroll-bar" v-if="!!cartData.length">
      <CartItem
        v-for="books in cartData"
        :name="books?.Title"
        :publisher="books?.Publisher"
        :id="books?.id"
        :key="books?.id"
        :price="books?.price! * books?.quantity!"
        :quantity="books?.quantity!"
        @updateQuantity="handleUpdateQuantity(books.id, $event)"
        @removeFromCart="cartStore.removeFromCartData(books.id)"
      />
    </div>

    <div class="cart-total" v-if="!!cartData.length">
      <div class="cart-checkout">
        <Checkout
          v-for="checkout in checkoutData"
          :description="checkout?.description"
          :price="checkout?.price"
          :key="checkout?.description"
        />

        <div class="cart-checkout-total">
          <span>Order total</span>
          <span>${{ totalPrice + 40 + 80 }}.00</span>
        </div>
      </div>

      <div class="cart-button">
        <Button size="medium" variant="primary"> Checkout </Button>
      </div>
    </div>

    <p v-else="!cartData?.length" class="cart-empty">
      Shopping <span>Bag</span> is empty!
    </p>
  </div>
</template>
