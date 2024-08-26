<script setup>
import { ref, onBeforeMount } from "vue"
import { post_detail_api } from "@/services/post.js"
import ItemPost from "./ItemPost.vue"

const props = defineProps(["post_ids"])

onBeforeMount(async () => {
    await getPosts()
})

const posts = ref([])

const getPosts = async () => {
    props.post_ids.forEach(async item => {
        await post_detail_api(item.id).then(res => {
            posts.value.push(res)
        })
    });
}

</script>

<template>
    <div>
        <ItemPost v-for="post of posts" :key="post.id" :post="post"/>
    </div>
</template>

<style scoped>

</style>