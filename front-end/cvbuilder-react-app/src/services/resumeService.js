import http from "./httpService";
import config from "../config.json"
import qs from 'querystring';

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

export const saveDocsInfo = (docsForm, id = "") => {
    return http.post(`${config.local_api}/users/docs/${id}`, docsForm, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export const getDocsInfo = () => {
    return http.get(`${config.local_api}/users/docs`)
}

export const saveEducationHistories = eduHistoryForm => {
    return http.post(`${config.local_api}/users/edus`, eduHistoryForm)
}

export const getEducationHistories = () => {
    return http.get(`${config.local_api}/users/edus`)
}

export const saveJobHistories = jobHistoryForm => {
    return http.post(`${config.local_api}/users/jobs`, jobHistoryForm)
}

export const getJobHistories = () => {
    return http.get(`${config.local_api}/users/jobs`)
}

export const saveResearches = researchForm => {
    return http.post(`${config.local_api}/users/researchs`, researchForm)
}

export const getResearches = () => {
    return http.get(`${config.local_api}/users/researchs`)
}

export const saveProjects = projectForm => {
    return http.post(`${config.local_api}/users/projects`, projectForm)
}

export const getProjects = () => {
    return http.get(`${config.local_api}/users/projects`)
}

export const saveLanguageSkills = skillForm => {
    return http.post(`${config.local_api}/users/skills`, skillForm)
}

export const saveHonores = honorForm => {
    return http.post(`${config.local_api}/users/honors`, honorForm)
}

export const getallResumeByUser = () => {
    return http.get(`${config.local_api}/users/populated`)
}
