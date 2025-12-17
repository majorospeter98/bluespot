<template>
  
    <div>
 <the-header></the-header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  
</template>
<script setup>
  import Logo from '@/assets/logo.svg';
import TheHeader from './components/TheHeader.vue';
</script>


