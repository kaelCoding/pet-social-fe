import { computed, ref } from "vue";
import { token } from "./auth";

const messageSocket_deep = ref(null)

export const messageSocket = computed(() => {
    return messageSocket_deep.value
})

export const init_socket = () => {
    const socket = new WebSocket("ws://localhost:8001");

    socket.addEventListener("open", (event) => {
        socket.send(JSON.stringify({
            action: 'CONNECT_SOCKET',
            data: token.value
        }))
    });

    socket.addEventListener("message", (event) => {
        messageSocket_deep.value = JSON.parse(event.data)
    });
}

