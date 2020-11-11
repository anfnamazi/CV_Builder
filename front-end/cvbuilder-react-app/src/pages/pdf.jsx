import React, { Fragment, useEffect, useState } from "react";
import {
  getBaseInfoByAdmin,
  getContactInfoByAdmin,
  getDocsInfoByAdmin,
  getEducationHistoriesByAdmin,
  getJobHistoriesByAdmin,
} from "../services/adminService";

const Pdf = ({ match }) => {
  const [baseInfo, setbaseInfo] = useState({});
  const [contactInfo, setcontactInfo] = useState({});
  const [docs, setdocs] = useState([]);
  const [edus, setedus] = useState([]);
  const [jobs, setjobs] = useState([]);

  const getAllInfo = async (userId) => {
    const response = await getBaseInfoByAdmin(userId);
    const response2 = await getContactInfoByAdmin(userId);
    const response3 = await getDocsInfoByAdmin(userId);
    const responseEdus = await getEducationHistoriesByAdmin(userId);
    const responseJobs = await getJobHistoriesByAdmin(userId);
    if (
      response.status < 210 &&
      response2.status < 210 &&
      response3.status < 210 &&
      responseEdus.status < 210 &&
      responseJobs.status < 210
    ) {
      setbaseInfo({ ...response.data });
      setcontactInfo({ ...response2.data });
      setdocs([...response3.data.docs]);
      setedus([...responseEdus.data.docs]);
      setjobs([...responseJobs.data.docs]);
    }
  };

  useEffect(() => {
    if (match.params.id) {
      getAllInfo(match.params.id);
    }
  }, []);
  return <Fragment></Fragment>;
};

export default Pdf;
