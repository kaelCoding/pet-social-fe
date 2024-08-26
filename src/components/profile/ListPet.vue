<script setup>
import { onBeforeMount, ref } from "vue";
import { detail_pet_api } from "@/services/pet.js"
const props = defineProps(["pet_ids", "hideDesc"])

onBeforeMount(async () => {
    await getPets()
})

const pets = ref([])
const getPets = async () => {
    props.pet_ids.forEach(async item => {
        await detail_pet_api(item.id).then(res => {
            pets.value.push(res)
        })
    });
}
</script>

<template>
    <div class="tab-list-row">
        <div class="tab-list-row" v-for="pet of pets" :key="pet.id" >
            <RouterLink 
                :to="`/profile/pet/${pet.id}`"
                class="pet"
            >
                <i class="bi bi-twitter pet-avatar"></i> 
                <span class="pet-name">{{ pet.name }}</span>
            </RouterLink>
            <span v-if="!hideDesc" class="tab-text">{{ pet.description }}</span>
        </div>
    </div>
</template>

<style scoped>
.tab-list-row {
    flex-wrap: wrap;
}

.pet {
    background: #ffe8bb;
    color: #ff440a;
    padding: 6px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 2px solid #faaa65;
    border-radius: 6px;
    width: max-content;
}

.pet-avatar {
    width: 24px;
    height: 24px;
}
</style>