import { process_error } from ".";
import { api } from "@/modules/api";

export const conversations_get_api = async () => {
    try {
        return await api("GET", "/conversations/my")
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const conversations_mount_api = async (idConversation) => {
    try {
        return await api("POST", `/conversations/${idConversation}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const message_send_api = async (idCon, data) => {
    try {
        return await api("POST", `/conversations/${idCon}/messages/send`, data)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const message_delete_api = async (idMess) => {
    try {
        return await api("DELETE", `/conversations/message/${idMess}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const message_update_api = async (idMess, data) => {
    try {
        return await api("PATCH", `/conversations/message/${idMess}`, data)
    } catch (error) {
        process_error(error)
        throw error
    }
}