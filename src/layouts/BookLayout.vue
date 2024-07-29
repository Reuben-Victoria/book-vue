<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <main class="book-layout hide-scroll-bar">
    <Navbar />
    <div class="book-layout-children"><slot></slot></div>
  </main>
</template>
