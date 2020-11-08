import http from "./httpService";
import config from "../config.json"

export const saveBaseInfo = baseForm => {
    return http.post(`${config.local_api}/users/base`, baseForm, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}