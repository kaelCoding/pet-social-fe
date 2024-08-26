<script setup>
import { ref } from "vue";

const props = defineProps({
  options: Array,
  icon: String,
  label: String
});

const showDropdown = ref(false)
const closeDropdown = () => {
    showDropdown.value = false;
}

const switchDropdown = () => {
    showDropdown.value = !showDropdown.value
}
</script>

<template>
    <div>
        <span class="ellipsis" @click="switchDropdown">
            <i :class="icon"></i>
            <span v-if="label">{{ label }}</span>
        </span>

        <div class="hover-popup" v-if="showDropdown" @click="closeDropdown">
            <div class="popup tab-list-col" >
                <slot name="options"></slot>
            </div>
        </div>

        <div class="overlay" v-if="showDropdown" @click="closeDropdown"></div>
    </div>
</template>
<style scoped>
.ellipsis {
  cursor: pointer;
}

.bi-three-dots-vertical {
    font-size: 20px;
}

.hover-popup {
    position: relative;
}

.popup {
    position: absolute;
    right: 0px; 
    z-index: 11;
    width: 180px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #eee;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3)
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
}
</style>