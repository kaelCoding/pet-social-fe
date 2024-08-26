<script setup>
import { onBeforeMount, ref } from "vue";
import { getUserInfo } from "@/stores/user.js";

const props = defineProps(["profile_id", "hideImg", "hideLink", "hideName"])

const user = ref(null)
onBeforeMount(async () => {
    user.value = await getUserInfo(props.profile_id)
})

</script>

<template>
    <div>
        <RouterLink v-if="user && !hideLink" class="tab-list-row" :to="'/profile/' + user.id">
            <img v-if="!hideImg" class="profile-photo" src="https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" alt="">
            <span v-if="!hideName" :class="!hideImg ? 'mess-font' : 'tab-text'">{{ user.name }}</span>
        </RouterLink>
        <div class="link tab-list-row" v-if="user && hideLink">
            <img v-if="!hideImg" class="profile-photo2" src="https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" alt="">
            <span v-if="!hideName" :class="!hideImg ? 'mess-font2' : 'tab-text'">{{ user.name }}</span>
        </div>
    </div>
</template>

<style scoped>
.mess-font {
    font-size: 18px;
    font-weight: 600;
}

.profile-photo {
    width: 38px;
    height: 38px;
    border-radius: 50%;
}

.profile-photo2 {
    width: 35px;
    height: 35px;
    border-radius: 50%;
}

.mess-font2 {
    font-size: 17px;
    font-weight: 600;
}
</style>