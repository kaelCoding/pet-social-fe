<script setup>
import CardUser from "@/components/profile/CardUser.vue"
import ListPet from "../profile/ListPet.vue";
import ListHashtag from "./ListHashtag.vue";
import { computed, ref } from "vue";
import PostDetail from "./PostDetail.vue";
import MenuDropdown from "../common/MenuDropdown.vue";
import CreatePost from "./CreatePost.vue";
import { get_auth_user } from "@/stores/auth";
import { post_delete_api, post_like_api } from "@/services/post";
import { useRouter } from "vue-router";
import { openPopup } from "@/stores/popup";
import ActionPost from "./ActionPost.vue";

const props = defineProps(["post"])
const emits = defineEmits(["deletePost"])

const router = useRouter()

const isMyPost = computed(() => {
    return get_auth_user.value.profile_id == props.post.profile_id
})

const showPopupDetail = ref(false)
const showPopupUpdate = ref(false)

const openPopupPost = (type) => {
    if(type == 'Detail') {
        showPopupDetail.value = true
    }
    if(type == 'Update') {
        showPopupUpdate.value = true
    }
}

const closePopupPost = () => {
    showPopupDetail.value = false
    showPopupUpdate.value = false
}

const updatePost = (post) => {
    props.post.content = post.content
    props.post.title = post.title
    props.post.files = post.files
    props.post.pets = post.pets
    props.post.hashtags = post.hashtags

    closePopupPost()
}

const openDeletePost = () => {
    openPopup({
        title: "Confirm",
        content: "Are you sure want to delete this post ?",
        confirm: async () => {
            try {
                await post_delete_api(props.post.id).then(res => {
                    emits("deletePost")
                    router.push("/posts")
                })
            } catch (error) {
                console.log(error)
            }
        }
    })
}

const updateComments = (comment) => {
    props.post.post_comments.unshift(comment);
}

const likePost = async () => {
    try {
        await post_like_api(props.post.id).then(res => {
            props.post.post_likes = res
        })
    } catch (error) {
        console.log(error)
    }
}

const isLiked = computed(() => {
    const indexLike = props.post.post_likes.findIndex(item => item.profile_id == get_auth_user.value.profile_id)
    if (indexLike >= 0) {
        return true
    }

    return false
})
</script>

<template>
    <div class="card" >
        <div class="post-nav">
            <CardUser :profile_id="post.profile_id"/>
            <MenuDropdown v-if="isMyPost" :icon="`bi bi-three-dots`">
                <template #options>
                    <span class="popup-tab" @click="openPopupPost('Update')">
                        <i class="bi bi-pencil"></i>
                        <span class="font-content">Update</span>
                    </span>
                    
                    <span class="popup-tab" @click="openDeletePost">
                        <i class="bi bi-trash3"></i>
                        <span class="font-content">Delete</span>
                    </span>
                </template>
            </MenuDropdown>
            <CreatePost 
                v-if="showPopupUpdate"
                :dataPost="post"
                @close="closePopupPost"
                @updatePost="updatePost"
            />
        </div>
        <div class="tab-list-col" @click="openPopupPost('Detail')">
            <span class="font-title"> {{ post.title }}</span>

            <span class="font-content">{{ post.content }}</span>
        
            <div class="tab-list-row" v-if="(post.pets && post.pets.length > 0) || post.hashtags">
                <ListPet v-if="post.pets && post.pets.length > 0" :pet_ids="post.pets" :hideDesc="true"/>
                <ListHashtag :hashtags="post.hashtags" />
            </div>

            <div v-if="post.files.length > 0" class="img-ctn tab-list-row">
                <img class="post-img" v-for="file of post.files" :key="file.id" :src="$loadFile(file.link)">
            </div>
        </div>
        <hr>
        <div class="tab-list-row post-action">
            <span @click="likePost" class="tab-action">
                <span v-if="!isLiked">
                    <i class="bi bi-hand-thumbs-up"></i>
                    <span class="tab-text">Like</span>
                    <span class="tab-text">{{ post.post_likes.length }}</span>
                </span>
               <span style="color: var(--c-primary);" v-else>
                    <i class="bi bi-hand-thumbs-up-fill"></i>
                    <span class="tab-text">Like</span>
                    <span class="tab-text">{{ post.post_likes.length }}</span>
               </span>
            </span>

            <span class="tab-action" @click="openPopupPost('Detail')">
                <i class="bi bi-chat"></i>
                <span class="tab-text">Comment</span>
                <span class="tab-text">{{ post.post_comments.length }}</span>
            </span>

            <span class="tab-action">
                <i class="bi bi-send"></i>
                <span class="tab-text">Send</span>
            </span>

            <span class="tab-action">
                <i class="bi bi-share"></i>
                <span class="tab-text">Share</span>
            </span>
        </div>

        <PostDetail 
            v-if="showPopupDetail"
            :post="post"
            @close="closePopupPost"
            @deletePost="openDeletePost"
        />
    </div>
</template>

<style scoped>
.img-ctn {
    overflow-x: scroll;
    border-radius: 8px;
    max-width: max-content;
}

.post-img {
    width: 300px;
    height: 400px;
    object-fit: cover;
}

.post-action {
    width: 100%;
}

.tab-action {
    width: 25%;
    text-align: center;
    padding: 12px;
}

.tab-action:hover {
    background-color: var(--c-white-light);
    cursor: pointer;
    border-radius: 8px;
}

.font-title {
    color: var(--c-text);
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
</style>