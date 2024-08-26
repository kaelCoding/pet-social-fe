<script setup>
import { computed, ref, watch } from 'vue';
import NavbarDropdown from './NavbarDropdown.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const keySearch = ref("")

const search = () => {
  let service = 'posts'
  if(serviceSearch.value) {
    service = serviceSearch.value
  }
  
  router.push(`/search?key=${keySearch.value}&service=${service}`)
}

const serviceSearch = computed(() => {
  return route.query.service
})

const keySearchRoute = computed(() => {
  return route.query.key
})

watch(()=> keySearchRoute.value, ()=> {
  keySearch.value = keySearchRoute.value
})
</script>

<template>
    <div class="full nav-ctn">
      <div class="tab-list-row">
        <RouterLink to="/">
          <i class="bi bi-twitter"></i>
          <span class="tab-text">Pet social</span>
        </RouterLink>

        <div class="navbar-search inp--light tab-list-row">
          <i class="bi bi-search"></i>
          <input class="inp--light" type="text" v-model="keySearch" @keyup.enter="search" placeholder="Find something">
        </div>
      </div>

      <NavbarDropdown/>
    </div>
</template>

<style scoped>
.nav-ctn{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;
}

.navbar-search {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid var(--c-border);
  margin-left: 12px;
}

input {
  width: 100%;
  border: unset;
  padding: unset;
  border-radius: unset;
  outline: none;
}

.bi-search {
  font-size: 16px;
  color: gray;
}
</style>