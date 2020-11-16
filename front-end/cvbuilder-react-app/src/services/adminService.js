import http from "./httpService";
import config from "../config.json"

export const getallUsers = () => {
    return http.get(`${config.local_api}/users`)
}

export const getBaseInfoByAdmin = userId => {
    return http.get(`${config.local_api}/${userId}/base`)
}


export const getContactInfoByAdmin = userId => {
    return http.get(`${config.local_api}/${userId}/contactInfo`)
}

export const getDocsInfoByAdmin = userId => {
    return http.get(`${config.local_api}/${userId}/docs`)
}

export const getEducationHistoriesByAdmin = userId => {
    return http.get(`${config.local_api}/${userId}/edus`)
}

export const getJobHistoriesByAdmin = userId => {
    return http.get(`${config.local_api}/${userId}/jobs`)
}