<script setup>
import { ref } from "vue"
import { post_comment_api, post_delete_comment_api } from '@/services/post';
import { get_auth_user } from "@/stores/auth";
import CardUser from "../profile/CardUser.vue";

const props = defineProps(["idPost"])
const emits = defineEmits(["updateComments"])

const inpComment = ref("")

const postComment = async () => {
    if (inpComment.value && inpComment.value.length < 2000) {
        try {
            await post_comment_api(props.idPost, {
                content: inpComment.value
            }).then(res => {
                inpComment.value = ""

                emits("updateComments", res)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<template>
    <div class="container">
        <form class="tab-list-row" @submit.prevent="postComment">
            <CardUser :profile_id="get_auth_user.profile_id" :hideLink="true" :hideName="true"/>

            <div class="card">
                <input v-model="inpComment" type="text" placeholder="Write a comment...">
            </div>
        </form>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
}

.card {
    width: 100%;
    border-radius: 24px;
    background-color: var(--c-white-light);
    box-shadow: unset;
    border: 1px solid var(--c-border);
}

input {
    background-color: var(--c-white-light);
    padding: unset;
    width: 100%;
    border: none;
    outline: none;
}
</style>