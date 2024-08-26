<script setup>
import { onBeforeMount, ref } from "vue";
import { getUserInfo } from "@/stores/user.js";
import { RouterLink } from "vue-router";

const props = defineProps(["profile_id"])

const user = ref(null)
onBeforeMount(async () => {
    user.value = await getUserInfo(props.profile_id)
})

</script>

<template>
   <div>
        <div v-if="user">
            <RouterLink :to="'/profile/' + user.id" class="routerLink mess-font">
                {{ user.name }} 
            </RouterLink>
        </div>
   </div>
</template>

<style scoped>
.mess-font {
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
}
</style>