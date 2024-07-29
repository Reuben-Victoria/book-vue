<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useCartStore } from "../store/useCartStore";
import { RouterLink } from "vue-router";
import Cart from "./cart/Cart.vue";
import "../assets/styles/components/_navbar.scss";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverOverlay,
} from "@headlessui/vue";
import { computed } from "vue";

const cartStore = useCartStore();

const totalItemsInBag = computed(() => cartStore.totalItemsInBag);
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="navbar-logo">
      <Icon icon="ph:book-fill" class="navbar-logo-icon" />
      <h1>Book <span>Inc</span></h1>
    </RouterLink>

    <ul class="navbar-list">
      <li>
        <Popover class="relative">
          <PopoverButton  class="navbar-list-cart">
            <Icon icon="ph:handbag-fill" class="navbar-list-cart-icon" />
            <span>{{ totalItemsInBag }}</span>
          </PopoverButton>

          <PopoverOverlay class="cart-overlay" />
          <transition
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              v-motion
              :initial="{ y: 20, opacity: 0 }"
              :enter="{
                y: 0,
                opacity: 1,
                transition: {
                  type: 'tween',
                  duration: 0.3,
                },
              }"
              :exit="{
                opacity: 0,
                y: 20,
                transition: { duration: 0.3 },
              }"
              class="cart-modal"
            >
              <Cart>
                <PopoverButton>
                  <Icon icon="ph:x" />
                </PopoverButton>
              </Cart>
            </PopoverPanel>
          </transition>
        </Popover>
      </li>
    </ul>
  </nav>
</template>
