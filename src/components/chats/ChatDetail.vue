<script setup>
import { message_send_api, message_update_api, message_delete_api } from '@/services/chat';
import { onMounted, ref, watch } from 'vue';
import { messageSocket } from '@/stores/socket';
import CardUser from '../profile/CardUser.vue';
import { get_auth_user } from '@/stores/auth';
import MenuDropdown from '../common/MenuDropdown.vue';
import { openPopup } from '@/stores/popup';
import { useRouter } from 'vue-router';

const isMyMess = (id) => {
    if (get_auth_user.value.profile_id == id) {
        return true;
    }
    return false;
}

const router = useRouter()

watch(() => messageSocket.value, () => {
    switch (messageSocket.value.action) {
        case "CONVERSATION_SEND_MESS":
            // if(messageSocket.value.data.conversation_id == props.conversation.id){
            const data = messageSocket.value.data;
            pushMessage(data)

            if (isNearBottom) {
                scrollMess()
            }
            // }
            break;
        case "CONVERSATION_DELETE_MESS":
            const conversationId = messageSocket.value.data.conversation_id
            const messageId = messageSocket.value.data.message_id

            if (props.conversation.id == conversationId) {
                deleteMess(messageId)
            }
            break;
    }
})

const isNearBottom = () => {
    const nearBottom = chatMessageElm.value.scrollTopMax - chatMessageElm.value.scrolltop;

    if (nearBottom < 200) {
        return true;
    }
    return false;
}

const props = defineProps(["conversation"])

onMounted(() => {
    scrollMess()
})

const contentMessage = ref("")

const sendMessage = async () => {
    if (!contentMessage.value) {
        return;
    }

    let content = contentMessage.value
    contentMessage.value = ""

    try {
        await message_send_api(props.conversation.id_guest, {
            content: content
        }).then(res => {
            pushMessage(res)

            scrollMess()
        })
    } catch (error) {
        console.log(error)
    }
}

const pushMessage = (message) => {
    const idf = props.conversation.messages.findIndex(item => item.id == message.id)

    if (idf < 0) {
        props.conversation.messages.push(message)
    }
}

const chatMessageElm = ref(null)
const scrollMess = async () => {
    await delay(200)
    chatMessageElm.value.scroll({
        top: chatMessageElm.value.scrollHeight,
        behavior: "instant"
    })
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const deleteMess = async (id, index) => {
    openPopup({
        title: "Confirm",
        content: "Are you sure want to delete this message ?",
        confirm: async () => {
            try {
                await message_delete_api(id);
                props.conversation.messages.splice(index, 1);
            } catch (error) {
                console.log(error)
            }
        }
    })
}

const messageNeedEdit = ref(null)
const openEditMess = (messageEdit) => {
    messageNeedEdit.value = JSON.parse(JSON.stringify(messageEdit))
}

const cancelEditMess = () => {
    messageNeedEdit.value = null
}

const saveEditMess = async () => {
    const indexMess = props.conversation.messages.findIndex(mess => mess.id == messageNeedEdit.value.id)
    const messOrg = props.conversation.messages[indexMess]

    try {
        await message_update_api(messOrg.id, {
            content: messageNeedEdit.value.content
        }).then(res => {
            messOrg.content = res.content
            cancelEditMess()
        })
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div class="chat-detail">
        <div class="chat-nav">
            <div class="chat-nav-name">
                <CardUser :profile_id="conversation.id_guest" />
            </div>
        </div>

        <div class="chat-message" ref="chatMessageElm">
            <div v-for="(message, index) of conversation.messages" :key="message.id" class="message-div">
                <CardUser v-if="!isMyMess(message.profile_id)" :profile_id="message.profile_id" :hideLink="true" />

                <div class="flex">
                    <div :class="isMyMess(message.profile_id) ? 'mess-action-ctn' : ''">
                        <MenuDropdown class="mess-action" v-if="isMyMess(message.profile_id)"
                            :icon="`bi bi-three-dots-vertical`">
                            <template #options>
                                <span class="popup-tab" @click="openEditMess(message)">
                                    <i class="bi bi-pencil"></i>
                                    <span class="font-content">Edit</span>
                                </span>

                                <span class="popup-tab" @click="deleteMess(message.id, index)">
                                    <i class="bi bi-trash3"></i>
                                    <span class="font-content">Delete</span>
                                </span>
                            </template>
                        </MenuDropdown>
                    </div>

                    <span class="comment font-content"
                        :class="isMyMess(message.profile_id) ? 'comment-color1' : 'comment-color2'">
                        {{ message.content }}
                    </span>
                </div>
            </div>
        </div>

        <div class="chat-send">
            <div class="card">
                <textarea class="input-send" placeholder="Enter message..." v-model="contentMessage"
                    v-on:keyup.enter="sendMessage" v-if="!messageNeedEdit"></textarea>
                <textarea class="input-send" placeholder="Enter message..." v-model="messageNeedEdit.content"
                    v-on:keyup.enter="saveEditMess" v-else></textarea>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-detail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
}

.chat-nav {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-bottom: 1px solid var(--c-border);
    box-shadow: 0 1px 1px var(--c-shadow);
    z-index: 1;
}

.chat-nav-name {
    font-size: 18px;
    font-weight: 600;
}

.chat-message {
    width: 100%;
    height: calc(100% - 52px);
    flex: 1;
    overflow-y: scroll;
    max-height: 100%;
    padding: 24px;
    background-color: var(--c-white-light);
}

.message-div {
    position: relative;
}

.message-div+.message-div {
    margin-top: 12px;
}

.mess-action-ctn {
    margin-left: auto
}

.mess-action {
    display: none;
}

.flex:hover .mess-action {
    display: block;
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

.comment {
    word-wrap: break-word;
    white-space: normal;
    border-radius: 18px;
    padding: 12px;
    max-width: 45%;
    width: max-content;
    margin-top: -5px;
}

.comment-color1 {
    background-color: var(--c-primary);
    color: var(--c-white);
}

.comment-color2 {
    background-color: var(--c-white);
    color: var(--c-text);
    margin-left: 40px;
}

.chat-send {
    width: 100%;
    height: 132px;
    padding: 18px;
    background-color: var(--c-white-light);
}

.chat-send .card {
    height: 100%;
}

.input-send {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
}
</style>