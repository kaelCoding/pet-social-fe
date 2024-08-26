<script setup>
import { computed } from 'vue';
import { get_auth_user } from '@/stores/auth';
import { message_delete_api } from '@/services/chat';

const props = defineProps(["message"])
const emits = defineEmits(["deleteMess", "openEditMess"])

const isMyMess = computed(() => {
    if(get_auth_user.value.profile_id == props.message.profile_id) {
        return true;
    }
    return false;
})

const deleteMess = async () => {
    try {
        await message_delete_api(props.message.id)

        emits("deleteMess", props.message.id)
    } catch (error) {
        console.log(error)
    }
}

const openEditMess = () => {
    emits("openEditMess", props.message)
}
</script>

<template>
    <div class="action">
        <button v-if="isMyMess" @click="openEditMess">Edit</button> |
        <button @click="deleteMess" v-if="isMyMess">Delete</button>
    </div>
</template>

<style scoped>
.action {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    border: 1px solid black
}

.message-div:hover .action {
    display: block;
}
</style>