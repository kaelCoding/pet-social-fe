<script setup>
import { ref } from "vue"
import { get_auth_user, logout, isCreatedProfile } from '@/stores/auth';
import { RouterLink } from "vue-router";

const showDropdown = ref(false)

const switchDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
    showDropdown.value = false
}

</script>

<template>
    <div>
        <div v-if="get_auth_user"> 
            <RouterLink style="margin-right: 24px" to="/chats">
                <i class="bi bi-chat-fill"></i>
                <span class="tab-text">Chats</span>
            </RouterLink>

            <a @click="switchDropdown">
                <i class="bi bi-person-fill"></i>
                <span class="tab-text">Account</span>
            </a>

            <div class="hover-popup" v-if="showDropdown">
                <div class="overlay" @click="closeDropdown"></div>
                <div class="popup tab-list-col" @click="closeDropdown">
                    <span class="tab font-content">{{ get_auth_user.email }}</span>
                    <RouterLink v-if="!isCreatedProfile" class="tab font-content" to="/profile/update">Create Profile</RouterLink>
                    <RouterLink v-else class="tab font-content" :to="`/profile/` + get_auth_user.profile_id">My Profile</RouterLink>
                    <span class="tab font-content" @click="logout">Logout</span>
                </div>
            </div>
        </div>
        <div v-else>
            <RouterLink class="tab font-content" to="/login">Login</RouterLink>
            
            <RouterLink class="font-content" to="/register">Register</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.hover-popup {
    position: relative;
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
}

.popup {
    position: absolute;
    background-color: var(--c-white);
    box-shadow: 4px 8px 14px #0000004d;
    border-radius: 8px;
    right: 0px;
    z-index: 11;
    border: 1px solid #eee;
    padding: 12px;
}

</style>