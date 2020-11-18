import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllResumeByAdmin } from "../services/adminService";

const Pdf = ({ match }) => {
  const [allInfo, setallInfo] = useState({
    contactInfo: {},
    educationHistories: [],
    honors: [],
    jobHistories: [],
    projects: [],
    researchs: [],
    skills: [],
    userBaseInfo: {},
  });

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const {
    firstName,
    lastName,
    job,
    birthDay,
    gender,
    marital,
    military,
    description,
  } = allInfo.userBaseInfo;

  const {
    email,
    phone,
    tel,
    webPage,
    country,
    province,
    city,
    address,
    socialMediaName,
    socialMediaId,
  } = allInfo.contactInfo;

  const {
    sectionEdu,
    fieldEdu,
    orientationEdu,
    uniType,
    uniName,
    averageEdu,
    uniCountry,
    uniProvince,
    uniCity,
    startEdu,
    endEdu,
    stillStudying,
  } = allInfo.educationHistories.length
    ? allInfo.educationHistories[allInfo.educationHistories.length - 1]
    : [{}];

  const {
    jobTitle,
    jobGroup,
    jobCenter,
    titleCenter,
    cooperateType,
    seniorLevel,
    jobCountry,
    jobProvince,
    jobCity,
    startJobMonth,
    startJobYear,
    endJobMonth,
    endJobYear,
    income,
    number,
    jobDescription,
    stillWorking,
  } = allInfo.jobHistories.length
    ? allInfo.jobHistories[allInfo.jobHistories.length - 1]
    : [{}];

  const {
    researchType,
    researchTitle,
    articleType,
    publisher,
    researchHyperlink,
    researchMonth,
    researchYear,
    researchDescription,
  } = allInfo.researchs.length
    ? allInfo.researchs[allInfo.researchs.length - 1]
    : [{}];

  const {
    projectTitle,
    projectEmployer,
    projectHyperlink,
    startProjectMonth,
    startProjectYear,
    endProjectMonth,
    endProjectYear,
    projectDescription,
  } = allInfo.projects.length
    ? allInfo.projects[allInfo.projects.length - 1]
    : [{}];

  const getAllInfo = async (userId) => {
    const response = await getAllResumeByAdmin(userId);
    if (response.status < 210) {
      setallInfo({ ...response.data });
    }
  };

  useEffect(() => {
    if (match.params.id) {
      getAllInfo(match.params.id);
    }
  }, []);
  return (
    <Fragment>
      <Grid container style={{ marginTop: 10 }} justify="space-evenly">
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.print()}
        >
          دانلود pdf
        </Button>
        <Link to="/admin">
          <Button variant="contained" color="secondary">
            بازگشت
          </Button>
        </Link>
      </Grid>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        اطلاعات پایه
      </Typography>
      <Paper style={{ padding: "10px 30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="نام:" />
                {firstName}
              </ListItem>
              <ListItem>
                <ListItemText secondary="نام خانوادگی:" />
                {lastName}
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان شغلی:" />
                {job}
              </ListItem>
              <ListItem>
                <ListItemText secondary="جنسیت:" />
                {gender}
              </ListItem>
              <ListItem>
                <ListItemText secondary="وضعیت تاهل:" />
                {marital}
              </ListItem>
              <ListItem>
                <ListItemText secondary="وضعیت سربازی:" />
                {military}
              </ListItem>
              <ListItem>
                <ListItemText secondary="تاریخ تولد:" />
                {new Date(birthDay).toLocaleDateString("fa-IR")}
              </ListItem>

              <ListItem>
                <ListItemText secondary="توصیف خلاصه:" />
                {description}
              </ListItem>
              <ListItem>
                <ListItemText secondary="شبکه اجتماعی:" />
                {socialMediaName}
              </ListItem>
              <ListItem>
                <ListItemText secondary="آی دی مرتبط:" />
                {socialMediaId}
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="ایمیل:" />
                {email}
              </ListItem>
              <ListItem>
                <ListItemText secondary="موبایل:" />
                {phone}
              </ListItem>
              <ListItem>
                <ListItemText secondary="تلفن:" />
                {tel}
              </ListItem>
              <ListItem>
                <ListItemText secondary="وب سایت:" />
                {webPage}
              </ListItem>
              <ListItem>
                <ListItemText secondary="کشور:" />
                {country}
              </ListItem>
              <ListItem>
                <ListItemText secondary="استان:" />
                {province}
              </ListItem>
              <ListItem>
                <ListItemText secondary="شهر:" />
                {city}
              </ListItem>
              <ListItem>
                <ListItemText secondary="آدرس:" />
                {address}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        سوابق تحصیلی
      </Typography>
      <Paper style={{ padding: "10px 30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="مقطع:" />
                {sectionEdu}
              </ListItem>
              <ListItem>
                <ListItemText secondary="رشته تحصیلی:" />
                {fieldEdu}
              </ListItem>
              <ListItem>
                <ListItemText secondary="گرایش/تخصص:" />
                {orientationEdu}
              </ListItem>
              <ListItem>
                <ListItemText secondary="نوع موسسه:" />
                {uniType}
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان موسسه:" />
                {uniName}
              </ListItem>
              <ListItem>
                <ListItemText secondary="معدل:" />
                {averageEdu}
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="کشور:" />
                {uniCountry}
              </ListItem>
              <ListItem>
                <ListItemText secondary="استان:" />
                {uniProvince}
              </ListItem>
              <ListItem>
                <ListItemText secondary="شهر:" />
                {uniCity}
              </ListItem>
              <ListItem>
                <ListItemText secondary="ورود:" />
                {startEdu}
              </ListItem>
              <ListItem>
                <ListItemText secondary="فراغت از تحصیل:" />
                {endEdu}
              </ListItem>
              <ListItem>
                <ListItemText secondary="در حال تحصیل:" />
                {stillStudying}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        سوابق شغلی
      </Typography>
      <Paper style={{ padding: "10px 30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="سمت شغلی:" />
                {jobTitle}
              </ListItem>
              <ListItem>
                <ListItemText secondary="گروه شغلی:" />
                {jobGroup}
              </ListItem>
              <ListItem>
                <ListItemText secondary="مرکز شغلی:" />
                {jobCenter}
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان مرکز:" />
                {titleCenter}
              </ListItem>
              <ListItem>
                <ListItemText secondary="نحوه همکاری:" />
                {cooperateType}
              </ListItem>
              <ListItem>
                <ListItemText secondary="سطح ارشدیت:" />
                {seniorLevel}
              </ListItem>
              <ListItem>
                <ListItemText secondary="کشور:" />
                {jobCountry}
              </ListItem>
              <ListItem>
                <ListItemText secondary="استان:" />
                {jobProvince}
              </ListItem>
              <ListItem>
                <ListItemText secondary="شهر:" />
                {jobCity}
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="ماه شروع:" />
                {months[startJobMonth - 1]}
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال شروع:" />
                {startJobYear}
              </ListItem>
              <ListItem>
                <ListItemText secondary="ماه اتمام:" />
                {months[endJobMonth - 1]}
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال شروع:" />
                {endJobYear}
              </ListItem>
              <ListItem>
                <ListItemText secondary="مشغول به فعالیت:" />
                {stillWorking}
              </ListItem>
              <ListItem>
                <ListItemText secondary="میزان درآمد:" />
                {income}
              </ListItem>
              <ListItem>
                <ListItemText secondary="شماره تماس:" />
                {number}
              </ListItem>
              <ListItem>
                <ListItemText secondary="وظایف و دستاوردها:" />
                {jobDescription}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        مقالات و پروژه ها
      </Typography>
      <Paper style={{ padding: "10px 30px", marginBottom: 30 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="نوع اثر:" />
                {researchType}
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان:" />
                {researchTitle}
              </ListItem>
              <ListItem>
                <ListItemText secondary="نوع مقاله:" />
                {articleType}
              </ListItem>
              <ListItem>
                <ListItemText secondary="ناشر:" />
                {publisher}
              </ListItem>
              <ListItem>
                <ListItemText secondary="لینک مرتبط:" />
                {researchHyperlink}
              </ListItem>
              <ListItem>
                <ListItemText secondary="ماه:" />
                {months[researchMonth - 1]}
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال:" />
                {researchYear}
              </ListItem>
              <ListItem>
                <ListItemText secondary="توضیحات:" />
                {researchDescription}
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="عنوان:" />
                {projectTitle}
              </ListItem>
              <ListItem>
                <ListItemText secondary="کارفرما/درخواست کننده:" />
                {projectEmployer}
              </ListItem>
              <ListItem>
                <ListItemText secondary="لینک مرتبط:" />
                {projectHyperlink}
              </ListItem>
              <ListItem>
                <ListItemText secondary="ماه شروع:" />
                {months[startProjectMonth - 1]}
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال شروع:" />
                {startProjectYear}
              </ListItem>
              <ListItem>
                <ListItemText secondary="ماه اتمام:" />
                {months[endProjectMonth - 1]}
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال اتمام:" />
                {endProjectYear}
              </ListItem>
              <ListItem>
                <ListItemText secondary="توضیحات:" />
                {projectDescription}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Pdf;
