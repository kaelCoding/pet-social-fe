<script setup>
import { conversations_get_api, conversations_mount_api } from '@/services/chat';
import { computed, nextTick, onBeforeMount, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import ChatDetail from "@/components/chats/ChatDetail.vue"
import CardUser from '@/components/profile/CardUser.vue';

const route = useRoute()
const idConversation = computed(() => {
    return route.params.idChat
})

const conversationDetail = ref(null)
const idConversationDetail = computed(() => {
    if(conversationDetail.value) {
        return conversationDetail.value.id
    }
})

const mountConversation = async () => {
    if(!idConversation.value){
        conversationDetail.value = null
        return;
    }
    
    try {
        await conversations_mount_api(idConversation.value).then(res => {
            conversationDetail.value = null

            nextTick(() => {
                conversationDetail.value = res

                const idf = conversations.value.findIndex(item => item.id == conversationDetail.value.id)
                if(idf < 0){
                    conversations.value.unshift(conversationDetail.value)
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

onBeforeMount(async () => {
    await getConversations()

    await mountConversation()
})

const conversations = ref([])

const getConversations = async () => {
    try {
        await conversations_get_api().then(res => {
            conversations.value = res
        })
    } catch (error) {
        console.log(error)
    }
}

watch(() => idConversation.value, async () => {
    await mountConversation()
})

</script>

<template>
    <div class="main">
        <div class="main-left">
            <div class="tableft-nav">
                <span>Chats</span>
            </div>
            <div class="tableft-tabs">
                <RouterLink 
                    v-for="conver of conversations" 
                    :key="conver.id"
                    :to="`/chats/${conver.id_guest}`"
                    :class="['conversation', conver.id == idConversationDetail ? 'conversation--active' : '']"
                > 
                    <CardUser :profile_id="conver.id_guest" :hideLink="true"/>
                </RouterLink>
            </div>
        </div>

        <div class="main-center">
            <ChatDetail 
                v-if="conversationDetail" 
                :conversation="conversationDetail"
            />
        </div>
    </div>
</template>

<style scoped>
.main {
    background-color: var(--c-white);
}

.main-left {
    width: 15%;
    padding: unset;
    border-right: 1px solid var(--c-border);
    box-shadow: 2px 0 5px -2px var(--c-shadow);
    z-index: 2;
}

.tableft-nav {
    width: 100%;
    height: 52px;
    border-bottom: 1px solid var(--c-border);
    display: flex;
    align-items: center;
    font-weight: 600;
    padding: 0 12px;
    font-size: 18px;
    box-shadow: 0 1px 1px var(--c-shadow);
}

.tableft-tabs {
    width: 100%;
    height: calc(100% - 52px);
    overflow-y: auto;
}

.conversation {
    width: 100%;
    display: flex;
    align-items: center;
    height: 52px;
    padding: 0 12px;
    border-bottom: 1px solid var(--c-border);
}

.conversation:hover {
    background-color: rgb(196, 230, 218);
}

.conversation--active {
    /* background-color: aquamarine; */
}

.conversation--active:hover {
    /* background-color: aquamarine; */
}

.main-center {
    width: 85%;
    max-width: unset;
    padding: unset;
}

</style> 