<script setup>
import Navbar from "@/components/layouts/Navbar.vue"
import Confirm from "@/components/common/Confirm.vue";
</script>

<template>
  <div class="app">
    <div class="navbar">
      <Navbar/>
    </div>

    <div class="main-ctn">
      <RouterView />
    </div>    
    <Confirm/>
  </div>
</template>

<style scoped>

</style>
