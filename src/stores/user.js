import { ref } from "vue"
import { user_info_get_api } from "@/services/profile";

const users = ref([])

// Những API đang được gọi
const usersCache = ref([])
/*
    userCache = {
        id: user_id
        api: api
    }
*/

export const getUserInfo = async (id) => {
    // kiem tra co user trong mang users thi tra ve - khoi ton time di get api
    const idUser = users.value.findIndex(user => user.id == id)
    if(idUser >= 0) {
        return users.value[idUser]
    }

    // kiem tra co api dang chay thi tiep tuc cho api
    const idCache = usersCache.value.findIndex(userCache => userCache.id == id)
    if(idCache >= 0) {
        return usersCache.value[idCache].api
    }

    try {
        const api = user_info_get_api(id).then(res => {
            // const idf = users.value.findIndex(user => res.id == user.id)
            // if(idf < 0) {
                users.value.push(res)
            // }

            // kiem tra api da chay xong thi xoa cache luu api dang chay
            const idCachex = usersCache.value.findIndex(userCache => userCache.id == res.id)
            if(idCachex >= 0){
                usersCache.value.splice(idCachex, 1)
            }

            return res        
        })  

        // them api dang chay vao cache
        usersCache.value.push({
            id: id,
            api: api
        })

        return api
    } catch (error) {
        console.log(error)
    }
}