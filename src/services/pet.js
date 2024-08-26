import { process_error } from ".";
import { api } from "@/modules/api";

export const pet_create_api = async (_, data) => {
    try {
        return await api("POST", "/pets", data)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const pet_update_api = async (id, data) => {
    try {
        return await api("PATCH", `/pets/${id}`, data)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const my_pet_api = async () => {
    try {
        return await api("GET", "/pets")
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const detail_pet_api = async (id) => {
    try {
        return await api("GET", `/pets/${id}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const pet_follow_api = async (id) => {
    try {
        return await api("POST", `/profiles/${id}/follow/pet`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const pet_follow_count_api = async (id) => {
    try {
        return await api("GET", `/profiles/${id}/pet/follow/count`)
    } catch (error) {
        process_error(error)
        throw error
    }
}