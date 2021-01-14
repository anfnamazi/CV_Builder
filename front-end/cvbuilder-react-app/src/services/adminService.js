import http from "./httpService";
import config from "../config.json";

const token = localStorage.getItem("token");

export const getallUsers = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users`
  );
};

export const getBaseInfoByAdmin = (userId) => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/${userId}/base`
  );
};

export const getContactInfoByAdmin = (userId) => {
  return http.get(
    `${
      config[process.env.REACT_APP_ENVIRONMENT].local_api
    }/${userId}/contactInfo`
  );
};

export const getDocsInfoByAdmin = (userId) => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/${userId}/docs`
  );
};

export const getEducationHistoriesByAdmin = (userId) => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/${userId}/edus`
  );
};

export const getJobHistoriesByAdmin = (userId) => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/${userId}/jobs`
  );
};

export const getAllResumeByAdmin = (userId) => {
  const newLocalUrl = `http://localhost:${
    config.port[process.env.REACT_APP_ENVIRONMENT]
  }`;
  return http.get(
    `${
      process.env.REACT_APP_ENVIRONMENT === "development"
        ? config[process.env.REACT_APP_ENVIRONMENT].local_api
        : ".."
    }/users/${userId}/populated`
  );
};

export const getUserCSV = (userId) => {
  return http.get(
    `${
      config[process.env.REACT_APP_ENVIRONMENT].local_api
    }/users/${userId}/csv?token=${token}`
  );
};

export const getUserZIP = (userId) => {
  window.open(
    `${
      config[process.env.REACT_APP_ENVIRONMENT].local_api
    }/users/${userId}/ZipAttachment?token=${token}`
  );
};
