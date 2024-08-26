import { process_error } from ".";
import { api } from "@/modules/api";

export const post_create_api = async (data) => {
    try {
        return await api("POST", "/posts", data)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const post_delete_api = async (id) => {
    try {
        return await api("DELETE", `/posts/${id}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const post_update_api = async (id, data) => {
    try {
        return await api("PATCH", `/posts/${id}`, data)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const post_list_api = async () => {
    try {
        return await api("GET", "/posts")
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const post_list_follow_api = async () => {
    try {
        return await api("GET", "/posts/follow")
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const post_detail_api = async (id) => {
    try {
        return await api("GET", `/posts/${id}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const post_like_api = async (idPost) => {
    try {
        return await api("POST", `/posts/${idPost}/like`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const post_comment_api = async (idPost, data) => {
    try {
        return await api("POST", `/posts/${idPost}/comment`, data)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const post_delete_comment_api = async (idComment) => {
    try {
        return await api("DELETE", `/posts/comment/${idComment}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const search_post_by_hashtag_api = async () => {
    try {
        return await api("GET", "/posts/hashtags/search")
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const search_hashtag_by_tag_api = async (tagInp) => {
    try {
        return await api("GET", `/posts/hashtags/search/tag?tag=${tagInp}`)
    } catch (error) {
        process_error(error)
        throw error
    }
}

export const search_hashtag_popular_api = async () => {
    try {
        return await api("GET", "/posts/hashtags/popular")
    } catch (error) {
        process_error(error)
        throw error
    }
}

