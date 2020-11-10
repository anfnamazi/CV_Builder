import http from "./httpService";
import config from "../config.json"
import qs from 'querystring'

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
    return http.post(`${config.local_api}/users/contactInfo`, qs.stringify(contactForm), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getContactInfo = () => {
    return http.get(`${config.local_api}/users/contactInfo`)
}

export const saveDocsInfo = (docsForm, id) => {
    return http.post(`${config.local_api}/users/docs/${id}`, docsForm, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export const getDocsInfo = () => {
    return http.get(`${config.local_api}/users/docs`)
}