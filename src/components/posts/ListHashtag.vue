<script setup>
const props = defineProps(["hashtags"])
</script>

<template>
   <div class="hashtag-chose-ctn tab-list-row">
        <RouterLink 
            v-for="tag of hashtags" 
            :to="`/search?service=hashtags&key=${tag.tag}`" 
            class="hashtag-chose" 
            :key="tag"
        >
            <span>#{{ tag.tag }}</span>
        </RouterLink>
    </div>
</template>

<style scoped>
.hashtag-chose-ctn {
    flex-wrap: wrap;
    gap: 12px;
}

.hashtag-chose {
    background-color: #cbe3fd;
    padding: 6px;
    border-radius: 8px;
    font-weight: 500;
}
</style>