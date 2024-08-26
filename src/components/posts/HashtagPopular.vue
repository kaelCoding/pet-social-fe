<script setup>
import { search_hashtag_popular_api } from '@/services/post';
import { onBeforeMount, ref } from 'vue';
import ListHashtag from './ListHashtag.vue';

const hashtags = ref([])
onBeforeMount(async () => {
    try {
        await search_hashtag_popular_api().then(res => {
            hashtags.value = res
        })
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <div>
        <ListHashtag :hashtags="hashtags"/>
    </div>
</template>

<style scoped>

</style>
