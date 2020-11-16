import http from "./httpService";
import config from "../config.json";
import qs from "querystring";

export const registerAdmin = user => {
    return http.post(
        `${config.local_api}/register`,
        user
    );
};

export const loginAdmin = user => {
    return http.post(`${config.local_api}/login`, user);
};

export const sendSms = phone => {
    return http.post(`${config.local_api}/sendsms`, qs.stringify(phone), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export const loginUser = request => {
    return http.post(`${config.local_api}/verify`, qs.stringify(request), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}