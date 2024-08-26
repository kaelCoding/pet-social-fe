import { init_auth } from "./auth"
import { init_socket } from "./socket"

// chua dang nhap
export const init_store = async () => {
    await init_auth()
}

// da dang nhap
export const init_store_logged_in = async () => {
    init_socket()
}