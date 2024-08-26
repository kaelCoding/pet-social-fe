import { process_error } from ".";
import { apiFormData } from "@/modules/api";

export const files_upload_api = async (data) => {
    try {
        return await apiFormData("POST", "/files/uploads", data)
    } catch (error) {
        process_error(error)
        throw error
    }
}