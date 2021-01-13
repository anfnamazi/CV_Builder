import http from "./httpService";
import config from "../config.json";
import qs from "querystring";

export const saveBaseInfo = (baseForm) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/base`,
    baseForm,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};

export const getBaseInfo = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/base`
  );
};

export const saveContactInfo = (contactForm) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/contactInfo`,
    qs.stringify(contactForm),
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );
};

export const getContactInfo = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/contactInfo`
  );
};

export const saveDocsInfo = (docsForm, id = "") => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/docs/${id}`,
    docsForm,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};

export const getDocsInfo = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/docs`
  );
};

export const saveEducationHistories = (eduHistoryForm) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/edus`,
    eduHistoryForm
  );
};

export const getEducationHistories = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/edus`
  );
};

export const saveJobHistories = (jobHistoryForm) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/jobs`,
    jobHistoryForm
  );
};

export const getJobHistories = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/jobs`
  );
};

export const saveResearches = (researchForm) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/researchs`,
    researchForm
  );
};

export const getResearches = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/researchs`
  );
};

export const saveProjects = (projectForm) => {
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/projects`,
    projectForm
  );
};

export const getProjects = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/projects`
  );
};

export const saveLanguageSkills = (languageForm) => {
  const obj = {
    languageForm,
  };
  const json = JSON.stringify(obj);
  const data = new FormData();

  languageForm.map((language) => {
    if (language.cert && language.cert.size) {
      data.append("cert", language.cert, language.Name);
    }
  });
  data.append("document", json);
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/languages`,
    data,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};

export const saveExperimentSkills = (experimentForm) => {
  const obj = {
    experimentForm,
  };
  const json = JSON.stringify(obj);
  const data = new FormData();
  if (experimentForm) {
    experimentForm.map((experiment) => {
      if (experiment.cert && experiment.cert.size) {
        data.append("cert", experiment.cert, experiment.Name);
      }
    });
    data.append("document", json);
  }
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/experiments`,
    data,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};

export const saveHonores = (honorForm) => {
  const obj = {
    honorForm,
  };
  const json = JSON.stringify(obj);
  const data = new FormData();
  if (honorForm) {
    honorForm.map((honor) => {
      if (honor.cert && honor.cert.size) {
        data.append("cert", honor.cert, honor.honorTitle);
      }
    });
    data.append("document", json);
  }
  return http.post(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/honors`,
    data,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};

export const getallResumeByUser = () => {
  return http.get(
    `${config[process.env.REACT_APP_ENVIRONMENT].local_api}/users/populated`
  );
};

export const saveMoneyAccount = (moneyAccountForm) => {
  return http.post(
    `${
      config[process.env.REACT_APP_ENVIRONMENT].local_api
    }/users/moneyAccounts`,
    moneyAccountForm
  );
};
