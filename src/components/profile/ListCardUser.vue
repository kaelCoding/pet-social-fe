<script setup>
import CardUser from "./CardUser.vue"
const props = defineProps(["profile_ids"])
const emits = defineEmits(["close"])

</script>

<template>
    <div class="overlay" @click="emits('close')">
        <div class="container" @click.stop="" v-if="profile_ids">
            <div v-for="profile_id of profile_ids" :key="profile_id">
                <CardUser :profile_id="profile_id"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0000004d;
}

.container {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    box-shadow: 4px 8px 14px #0000004d;
    border-radius: 8px;
    z-index: 11;
    width: 300px;
    border-radius: 10px;
    padding: 24px;
}
</style>