<script setup>
import { ref } from 'vue';
import { search_hashtag_by_tag_api } from '@/services/post';

const props = defineProps(["hashtags"])

const inpHashtag = ref("")
const hashtagsSearch = ref([])
const timeOutCallSearch = ref(null);

const searchHashtag = () => {
    if (inpHashtag.value) {
        if (timeOutCallSearch.value) {
            clearTimeout(timeOutCallSearch.value)
        }
        timeOutCallSearch.value = setTimeout(async () => {
            await callApiSearchHashtag()
        }, 500)
    } else {
        hashtagsSearch.value = []
    }
}

const callApiSearchHashtag = async () => {
    if(!inpHashtag.value) {
        hashtagsSearch.value = []
        return;
    }
    try {
        await search_hashtag_by_tag_api(inpHashtag.value).then(res => {
            const resFilter = []
            for(const tag of res) {
                const idf = props.hashtags.findIndex(item => item.tag == tag.tag);
                if(idf < 0) {
                    resFilter.push(tag)
                }
            }
            hashtagsSearch.value = resFilter;
        })
    } catch (error) {
        console.log(error)
    }
}

const choseHashtag = (tag) => {
    props.hashtags.push({
        tag: tag
    })

    removeHashtag(hashtagsSearch.value, tag)
}

const removeHashtag = (arr, tag) => {
    const idx = arr.findIndex(item => item.tag == tag)
    if(idx >= 0) {
        arr.splice(idx, 1)
    }
}

const enterHashtag = () => {
    choseHashtag(inpHashtag.value)

    inpHashtag.value = ""
}
</script>

<template>
    <div>
        <label>Hashtag</label>
        <div v-if="hashtagsSearch.length > 0" class="tag-suggest-hover">
            <div class="tag-suggest-popup card tab-list-col">
                <div class="tag-suggest" v-for="tag of hashtagsSearch" :key="tag" @click="choseHashtag(tag.tag)">
                    <span>#{{ tag.tag }}</span>
                </div>
            </div>
        </div>

        <input @input="searchHashtag" class="inp--light" type="text" v-model="inpHashtag"
            placeholder="Enter hashtag" v-on:keydown.enter.prevent="enterHashtag">
            
        <div class="hashtag-chose-ctn tab-list-row">
            <div class="hashtag-chose" v-for="tag of hashtags" :key="tag">
                <i class="bi bi-x-circle-fill" @click="removeHashtag(hashtags, tag.tag)"></i>
                <span>#{{ tag.tag }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tag-suggest-hover {
    position: relative;
}

.tag-suggest-popup {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80%;
    box-shadow: 1px solid var(--c-shadow);
    padding: unset;
    border-radius: 12px;
    border: 1px solid var(--c-border);
}

.tag-suggest {
    width: 100%;
    padding: 8px;
    font-weight: 500;
    cursor: pointer;
}

.tag-suggest:hover {
    background-color: var(--c-white-light);    
}

.tag-suggest + .tag-suggest {
    border-top: 1px solid var(--c-border);
}

.hashtag-chose-ctn {
    margin: 12px 0px;
    flex-wrap: wrap;
    gap: 12px;
}

.hashtag-chose {
    position: relative;
    background-color: #cbe3fd;
    padding: 6px;
    border-radius: 8px;
    font-weight: 500;
}

.bi-x-circle-fill {
    position: absolute;
    right: -7px;
    top: -7px;
    font-size: 14px;
    cursor: pointer;
    display: none;
}

.hashtag-chose:hover .bi-x-circle-fill {
    display: block;
}
</style>