<script setup>
import Navbar from "@/components/layouts/Navbar.vue"
import Noti from "@/components/common/Noti.vue";
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
    <Noti/>
    <Confirm/>
  </div>
</template>

<style scoped>

</style>
