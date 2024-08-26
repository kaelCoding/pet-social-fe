<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { post_list_api, post_list_follow_api } from "@/services/post";
import CreatePost from "@/components/posts/CreatePost.vue"
import ItemPost from "@/components/posts/ItemPost.vue"
import HashtagPopular from "@/components/posts/HashtagPopular.vue";

const props = defineProps(["type"])

const posts = ref([])

onBeforeMount(async () => {
    await getPosts()
})

const getPosts = async () => {
    if(props.type == "ALL"){
        await post_list_api().then(res => {
            posts.value = res;
        })
    }
    if(props.type == "FOLLOWING"){
        await post_list_follow_api().then(res => {
            posts.value = res;
        })
    }
}

watch(() => props.type, async () => {
    await getPosts()
})

const showPopupCreate = ref(false)

const openPopupCreate = () => {
    showPopupCreate.value = true
}

const closePopupCreate = () => {
    showPopupCreate.value = false
}

const createNewPost = (post) => {
    posts.value.unshift(post)

    closePopupCreate()
}

const typePostMess = computed(() => {
    if(props.type == "ALL") {
        return "All posts"
    }

    if(props.type == "FOLLOWING"){
        return "Posts following"
    }
})

const deletePost = (index) => {
    posts.value.splice(index, 1)
}
</script>

<template>
    <div class="main">
        <div class="main-left tab-list-col">
            <div class="card tab-list-col type-post-ctn">
                <RouterLink class="tab" to="/posts">
                    <b class="font-content">All posts</b>
                </RouterLink> 
                <RouterLink class="tab" to="/posts/following">
                    <b class="font-content">Following posts</b>
                </RouterLink>
            </div>
        </div>

        <div class="main-center">
            <div class="card flex">
                <span class="font-content">Say something to the world !</span>
                <button @click="openPopupCreate">Create post</button>
            </div>

            <div class="card form">
                <label for="">Create Story</label>
                <input @click="openPopupCreate" class="inp--light" type="text" placeholder="What's on your mind?">
            </div>
           
            <ItemPost 
                v-for="(post, index) of posts" 
                :key="post.id" 
                :post="post"
                @deletePost="deletePost(index)"
            />
        </div>
        <div class="main-right">
            <div class="card hashtags-ctn">
                <div class="font-hashtags">Popular hashtags</div>
                <HashtagPopular />
            </div>
        </div>
        
        <CreatePost 
            @createPost="createNewPost"
            @close="closePopupCreate"
            v-if="showPopupCreate" 
            :posts="posts"
        />
    </div>
</template>

<style scoped>
.main-left {
    /* margin-right: auto; */
}

.main-center {
    max-width: 1000px;
}

.main-right {
    /* margin-left: auto; */
}

button {
    margin-left: auto;
}

.type-post-ctn {
    width: 252px;
    margin-left: auto;
}

.hashtags-ctn {
    max-width: 352px;
}

.font-hashtags {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
}
</style>