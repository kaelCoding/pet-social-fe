import { process_error } from ".";
import { api } from "@/modules/api";

export const auth_login_api = async (data) => {
    try {
        return await api("POST", "/auth/login", data)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const auth_register_api = async (data) => {
    try {
        return await api("POST", "/auth/register", data)
    } catch (error) {
        // process_error(error)
        throw error
    }
}

export const auth_info_api = async () => {
    try {
        return await api("GET", "/auth/info")
    } catch (error) {
        process_error(error)
        throw error
    }
}