import { token } from "@/stores/auth";

export const api = async (method, url, data) => {
    const urlApi = "http://localhost:8000/api" + url;
    let body;
    if(data){
        body = JSON.stringify(data)
    }

    try {
        return await fetch(urlApi, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token.value
            },
            body: body,
        }).then(async res => {
            const data = await res.json()

            if(res.ok) {
                return data;
            } else {
                throw data;
            }
        })
    } catch (error) {
        throw error.error
    }
}

export const apiFormData = async (method, url, data) => {
    const urlApi = "http://localhost:8000/api" + url;

    try {
        return await fetch(urlApi, {
            method: method,
            mode: "cors",
            body: data,
        }).then(async res => {
            const data = await res.json()

            if(res.ok) {
                return data;
            } else {
                throw data;
            }
        })
    } catch (error) {
        throw error.error
    }
}