import http from "./httpService";
import config from "../config.json"

export const saveBaseInfo = baseForm => {
    return http.post(`${config.local_api}/users/base`, baseForm, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export const getBaseInfo = () => {
    return http.get(`${config.local_api}/users/base`)
}

export const saveContactInfo = contactForm => {
    return http.post(`${config.local_api}/users/contactInfo`, contactForm, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export const getContactInfo = () => {
    return http.get(`${config.local_api}/users/contactInfo`)
}