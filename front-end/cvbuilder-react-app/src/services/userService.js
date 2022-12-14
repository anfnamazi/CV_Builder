import http from "./httpService";
import config from "../config.json";
import qs from "querystring";

export const registerAdmin = (user) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/register`,
    user
  );
};

export const loginAdmin = (user) => {
  const prefixUrl = process.env.REACT_APP_ENVIRONMENT === "product" ? "." : "";
  return http.post(
    `${prefixUrl + config[process.env.REACT_APP_ENVIRONMENT].local_api}/login`,
    user
  );
};

export const sendSms = (phone) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/sendsms`,
    qs.stringify(phone),
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );
};

export const loginUser = (request) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/verify`,
    qs.stringify(request),
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );
};
