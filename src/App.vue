<template>
  <div>
    <the-header></the-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script setup>
import TheHeader from './components/TheHeader.vue'
</script>
<style>
  *{
scroll-behavior: smooth;
  }

</style>