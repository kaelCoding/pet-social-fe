<script setup>
import CardUser from "@/components/profile/CardUser.vue"
import Popup from "../common/Popup.vue";
import ListHashtag from "./ListHashtag.vue";
import ListPet from "../profile/ListPet.vue";
import ActionPost from "./ActionPost.vue";
import MenuDropdown from "../common/MenuDropdown.vue";
import { get_auth_user } from "@/stores/auth";
import { computed, ref } from "vue";
import CreatePost from "./CreatePost.vue";

const props = defineProps(["post"])
const emits = defineEmits(["close", "deletePost"])

const isMyPost = computed(() => {
    return get_auth_user.value.profile_id == props.post.profile_id
})

const updateLikes = (like) => {
    props.post.post_likes = like;
}

const updateComments = (comment) => {
    props.post.post_comments.unshift(comment);
}

const close = () => {
    emits("close")
}

const showPopupUpdate = ref(false)

const openPopupUpdate = () => {
    showPopupUpdate.value = true
}

const closePopupUpdate = () => {
    showPopupUpdate.value = false
}

const updatePost = (post) => {
    props.post.content = post.content
    props.post.title = post.title
    props.post.files = post.files
    props.post.pets = post.pets
    props.post.hashtags = post.hashtags

    closePopupUpdate()
}

const deletePost = () => {
    emits("deletePost")
}
</script>

<template>
    <div>
        <div v-if="post">
            <Popup :containerMaxWidth="'500px'" @close="close">
                <template v-slot:header>
                    <span>Post</span>
                </template>

                <template v-slot:body>
                    <div class="post-nav">
                        <CardUser :profile_id="post.profile_id" />
                        <MenuDropdown v-if="isMyPost" :icon="`bi bi-three-dots`">
                            <template #options>
                                <span class="popup-tab" @click="openPopupUpdate">
                                    <i class="bi bi-pencil"></i>
                                    <span class="font-content">Update</span>
                                </span>

                                <span class="popup-tab" @click="deletePost">
                                    <i class="bi bi-trash3"></i>
                                    <span class="font-content">Delete</span>
                                </span>
                            </template>
                        </MenuDropdown>
                        <CreatePost v-if="showPopupUpdate" :dataPost="post" @close="closePopupUpdate"
                            @updatePost="updatePost" />
                    </div>
                    <div class="tab-list-col">
                        <span class="font-title"> {{ post.title }}</span>
                        <span class="font-content"> {{ post.content }}</span>
                        <div class="tab-list-row" v-if="post.pets">
                            <ListPet :pet_ids="post.pets" :hideDesc="true" />
                        </div>
                        <div class="tab-list-row" v-if="post.hashtags">
                            <ListHashtag :hashtags="post.hashtags" />
                        </div>
                        <img class="post-img" v-for="file of post.files" :key="file.id" :src="$loadFile(file.link)">
                    </div>
                    <hr>
                    <!-- <div class="tab-list-row post-action">
                        <span @click="likePost" class="tab-action">
                            <i v-if="!isLiked" class="bi bi-hand-thumbs-up">
                                <span class="tab-text">Like</span>
                                <span class="tab-text">{{ post.post_likes.length }}</span>
                            </i>
                            <i v-else class="bi bi-hand-thumbs-up-fill">
                                <span class="tab-text">Like</span>
                                <span class="tab-text">{{ post.post_likes.length }}</span>
                            </i>
                        </span>

                        <span class="tab-action" @click="openPopupPost('Detail')">
                            <i class="bi bi-chat"></i>
                            <span class="tab-text">Comment</span>
                            <span class="tab-text">{{ post.post_comments.length }}</span>
                        </span>

                        <span class="tab-action">
                            <i class="bi bi-share"></i>
                            <span class="tab-text">Share</span>
                        </span>
                    </div>
                    <hr> -->
                    <div class="comment-ctn">
                        <div v-if="post.post_comments.length > 0" class="tab-list-col">
                            <div v-for="comment of post.post_comments" :key="comment.id">
                                <CardUser :profile_id="comment.profile_id" />
                                <div class="comment font-content">
                                    {{ comment.content }}
                                </div>
                                <!-- <span >{{ comment.created_at }}</span> -->
                            </div>
                        </div>
                        <div v-else>
                            <span>No comments to display</span>
                        </div>
                    </div>
                </template>

                <template v-slot:bottom>
                    <ActionPost :idPost="post.id" :comments="post.post_comments"
                        @updateComments="updateComments" />
                </template>
            </Popup>
        </div>
    </div>
</template>

<style scoped>
.post-img {
    width: 100%;
    height: auto;
}

.comment-ctn {
    width: 100%;
}

.comment {
    word-wrap: break-word;
    white-space: normal;
    background-color: #f0f2f5;
    border-radius: 18px;
    padding: 10px;
    margin-left: 45px;
    max-width: 90%;
    width: max-content;
    margin-top: -6px;
}

.tab-list-col {
    width: 100%;
}

.post-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.popup-tab {
    font-size: 14px;
    cursor: pointer;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.popup-tab:hover {
    background-color: #f0f0f0;
}

.post-action {
    width: 100%;
}

.tab-action {
    width: 33%;
    text-align: center;
    padding: 12px;
}

.tab-action:hover {
    background-color: var(--c-white-light);
    cursor: pointer;
    border-radius: 8px;
}

.bi-hand-thumbs-up-fill {
    color: var(--c-primary);
}
</style>