<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { search_api } from '@/services/search';
import ItemPost from '@/components/posts/ItemPost.vue';
import CardUser from '@/components/profile/CardUser.vue';
import HashtagPopular from '@/components/posts/HashtagPopular.vue';

const route = useRoute()

const keySearch = computed(() => {
    return route.query.key
})

const serviceSearch = computed(() => {
    return route.query.service
})

onBeforeMount(() => {
    search()
})

watch(() => serviceSearch.value, () => {
    searchData.value = []
    search()
})

watch(() => keySearch.value, () => {
    searchData.value = []
    search()
})

const searchData = ref([])
const search = async () => {
    try {
        await search_api(serviceSearch.value, keySearch.value).then(res => {
            searchData.value = res
        })
    } catch (error) {
        console.log(error)
    }
}

const searchServices = ref([
    {
        name: 'Posts',
        service: 'posts'
    }, {
        name: 'Pets',
        service: 'pets'
    }, {
        name: 'Profiles',
        service: 'profiles'
    }, {
        name: 'Hashtags',
        service: 'hashtags'
    },
])

// const replaceText = (str, fromValue, toValue) => {
//     const regex = new RegExp(fromValue, 'gi')
//     return str.replace(regex, toValue)
// }

// const displayText = (text) => {
//     text = replaceText(text, keySearch.value, `<b style='color: red'>${keySearch.value}</b>`)

//     return text
// }

</script>

<template>
    <div class="main">
        <div class="main-left">
            <div class="card search-filter">
                <span class="font-title">Search </span>
                <ul>
                    <li v-for="searchService of searchServices" :key="searchService.service">
                        <RouterLink :to="`search?key=${keySearch}&service=${searchService.service}`">
                            {{searchService.name}}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>

        <div class="main-center">
            <div v-if="serviceSearch == 'posts'">
                <ItemPost v-for="item of searchData" :key="item.id" :post="item" />
            </div>

            <div v-if="serviceSearch == 'pets'">
                <div v-for="item of searchData" :key="item.id">
                    <RouterLink v-html="displayText(item.name)"</RouterLink>
                    <p v-html="displayText(item.description)"></p>
                </div>
            </div>

            <div v-if="serviceSearch == 'profiles'">
                <div class="card" v-for="item of searchData" :key="item.id">
                    <CardUser  :profile_id="item.id"/>
                </div>
                <!-- <div v-for="item of searchData" :key="item.id">
                    <RouterLink v-html="displayText(item.name)"></RouterLink>
                    <p v-html="displayText(item.description)"></p>
                </div> -->
            </div>
        </div>

        <div class="main-right">
            <div class="card hashtags-ctn">
                <div class="font-hashtags">Popular hashtags</div>
                <HashtagPopular />
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-left {
    width: 252px;
}

.main-center {
    max-width: 1000px;
}

.search-filter ul {
    padding-left: 12px;
}

.search-filter li {
    padding: 5px 0px;
    font-size: 16px;
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