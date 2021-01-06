import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAllResumeByAdmin } from "../services/adminService";
import config from "../config.json";
import PDF from "../utils/pdfGen";

const Pdf = ({ match }) => {
  const [allInfo, setallInfo] = useState({
    educationHistories: [{}, {}],
    jobHistories: [{}, {}],
    researchs: [{}, {}],
    projects: [{}, {}],
    languages: [{}, {}],
    experiments: [{}, {}],
    honors: [{}, {}],
    docs: ["", ""],
    userBaseInfo: {},
    contactInfo: {},
    moneyAccounts: [],
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
    image,
    nationalCard,
    eduCertif,
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
    sanaCode,
  } = allInfo.contactInfo;

  const moneyAccount = { ...allInfo.moneyAccounts[0] };

  const { bankName, accountNumber, shabaNumber } = moneyAccount;

  const getAllInfo = async (userId) => {
    const response = await getAllResumeByAdmin(userId);
    if (response.status < 210) {
      const { userBaseInfo } = response.data;
      if (userBaseInfo) {
        setallInfo({ ...response.data });
      }
    }
  };

  const bodyRef = useRef();

  useEffect(() => {
    if (match.params.id) {
      getAllInfo(match.params.id);
    }
    PDF.createPdf(bodyRef.current);
  }, []);

  const newLocalUrl =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? config[process.env.REACT_APP_ENVIRONMENT].local_api
      : config.server_url;
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
      <div ref={bodyRef}>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          اطلاعات پایه
        </Typography>
        <Paper style={{ padding: "10px 30px" }}>
          <Grid container spacing={3} justify="center">
            {image ? (
              <img
                src={`${newLocalUrl}/img/${image}`}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: "50%",
                  margin: 20,
                }}
                alt=""
              />
            ) : null}
          </Grid>
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
                <ListItem>
                  <ListItemText secondary="کد ثنا:" />
                  {sanaCode}
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
                <ListItem>
                  <ListItemText secondary="نام بانک:" />
                  {bankName}
                </ListItem>
                <ListItem>
                  <ListItemText secondary="شماره حساب:" />
                  {accountNumber}
                </ListItem>
                <ListItem>
                  <ListItemText secondary="شماره شبا:" />
                  {shabaNumber}
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          سوابق تحصیلی
        </Typography>
        <Paper style={{ padding: "10px 30px" }}>
          {allInfo.educationHistories.map((edu) => (
            <Grid
              container
              spacing={3}
              style={{ borderBottom: "1px dotted #999" }}
            >
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="مقطع:" />
                    {edu.sectionEdu}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="رشته تحصیلی:" />
                    {edu.fieldEdu}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="گرایش/تخصص:" />
                    {edu.orientationEdu}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="نوع موسسه:" />
                    {edu.uniType}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="عنوان موسسه:" />
                    {edu.uniName}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="معدل:" />
                    {edu.averageEdu}
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="کشور:" />
                    {edu.uniCountry}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="استان:" />
                    {edu.uniProvince}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="شهر:" />
                    {edu.uniCity}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="ورود:" />
                    {edu.startEdu}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="فراغت از تحصیل:" />
                    {edu.endEdu}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="در حال تحصیل:" />
                    {edu.stillStudying ? "بله" : "خیر"}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          ))}
        </Paper>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          سوابق شغلی
        </Typography>
        <Paper style={{ padding: "10px 30px" }}>
          {allInfo.jobHistories.map((job) => (
            <Grid
              container
              spacing={3}
              style={{ borderBottom: "1px dotted #999" }}
            >
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="سمت شغلی:" />
                    {job.jobTitle}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="گروه شغلی:" />
                    {job.jobGroup}
                  </ListItem>
                  {/* <ListItem>
                  <ListItemText secondary="مرکز شغلی:" />
                  {job.jobCenter}
                </ListItem> */}
                  <ListItem>
                    <ListItemText secondary="عنوان مرکز:" />
                    {job.titleCenter}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="نحوه همکاری:" />
                    {job.cooperateType}
                  </ListItem>
                  {/* <ListItem>
                  <ListItemText secondary="سطح ارشدیت:" />
                  {job.seniorLevel}
                </ListItem> */}
                  <ListItem>
                    <ListItemText secondary="کشور:" />
                    {job.jobCountry}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="استان:" />
                    {job.jobProvince}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="شهر:" />
                    {job.jobCity}
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="ماه شروع:" />
                    {months[job.startJobMonth - 1]}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="سال شروع:" />
                    {job.startJobYear}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="ماه اتمام:" />
                    {months[job.endJobMonth - 1]}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="سال اتمام:" />
                    {job.endJobYear}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="مشغول به فعالیت:" />
                    {job.stillWorking ? "بله" : "خیر"}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="میزان درآمد:" />
                    {job.income}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="شماره تماس:" />
                    {job.number}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="وظایف و دستاوردها:" />
                    {job.jobDescription}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          ))}
        </Paper>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          مقالات
        </Typography>
        <Paper style={{ padding: "10px 30px", marginBottom: 30 }}>
          {allInfo.researchs.map((research) => (
            <Grid
              container
              spacing={3}
              style={{ borderBottom: "1px dotted #999" }}
            >
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="نوع اثر:" />
                    {research.researchType}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="عنوان:" />
                    {research.researchTitle}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="نوع مقاله:" />
                    {research.articleType}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="ناشر:" />
                    {research.publisher}
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="لینک مرتبط:" />
                    {research.researchHyperlink}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="ماه:" />
                    {months[research.researchMonth - 1]}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="سال:" />
                    {research.researchYear}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="توضیحات:" />
                    {research.researchDescription}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          ))}
        </Paper>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          پروژه ها
        </Typography>
        <Paper style={{ padding: "10px 30px", marginBottom: 30 }}>
          {allInfo.projects.map((project) => (
            <Grid
              container
              spacing={3}
              style={{ borderBottom: "1px dotted #999" }}
            >
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="عنوان:" />
                    {project.projectTitle}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="کارفرما/درخواست کننده:" />
                    {project.projectEmployer}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="لینک مرتبط:" />
                    {project.projectHyperlink}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="ماه شروع:" />
                    {months[project.startProjectMonth - 1]}
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="سال شروع:" />
                    {project.startProjectYear}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="ماه اتمام:" />
                    {months[project.endProjectMonth - 1]}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="سال اتمام:" />
                    {project.endProjectYear}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="توضیحات:" />
                    {project.projectDescription}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          ))}
        </Paper>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          زبان
        </Typography>
        <Paper style={{ padding: "10px 30px", marginBottom: 30 }}>
          {allInfo.languages.map((language) => (
            <Grid
              container
              spacing={3}
              style={{ borderBottom: "1px dotted #999" }}
            >
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="نام زبان:" />
                    {language.Name}
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="سطح خواندن:" />
                    {language.readSkill}/5
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="سطح نوشتن:" />
                    {language.writeSkill}/5
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <ListItemText secondary="سطح شنیداری:" />
                    {language.hearSkill}/5
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="سطح گفتاری:" />
                    {language.speakSkill}/5
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          ))}
        </Paper>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          مهارت های تجربی
        </Typography>
        <Paper style={{ padding: "10px 30px", marginBottom: 30 }}>
          {allInfo.experiments.map((experiment) => (
            <Grid
              container
              spacing={3}
              style={{ borderBottom: "1px dotted #999" }}
            >
              <Grid item xs={6}>
                <ListItem>
                  <ListItemText secondary="نام مهارت:" />
                  {experiment.Name}
                </ListItem>
                <ListItem>
                  <ListItemText secondary="سطح مهارت:" />
                  {experiment.skillLevel}/5
                </ListItem>
              </Grid>
              <Grid item xs={6}>
                <ListItem>
                  <ListItemText secondary="توضیحات:" />
                  {experiment.description}
                </ListItem>
                {/* {typeof experiment.experienceDoc === "object" ? (
                  <img
                    src={`${newLocalUrl}/img/${experiment.experienceDoc.file}`}
                    style={{
                      width: "100%",
                      margin: "10px 0",
                    }}
                    alt=""
                  />
                ) : null} */}
              </Grid>
            </Grid>
          ))}
        </Paper>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          افتخارات
        </Typography>
        <Paper style={{ padding: "10px 30px", marginBottom: 30 }}>
          {allInfo.honors.map((honor) => (
            <Grid
              container
              spacing={3}
              style={{ borderBottom: "1px dotted #999" }}
            >
              <Grid item xs={6}>
                <ListItem>
                  <ListItemText secondary="عنوان افتخار:" />
                  {honor.honorTitle}
                </ListItem>
              </Grid>
              <Grid item xs={6}>
                <ListItem>
                  <ListItemText secondary="ماه افتخار:" />
                  {months[honor.honorMonth - 1]}
                </ListItem>
                <ListItem>
                  <ListItemText secondary="سال افتخار:" />
                  {honor.honorYear}
                </ListItem>
              </Grid>
            </Grid>
          ))}
        </Paper>
        <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
          مدارک
        </Typography>
        <Paper style={{ padding: "10px 30px", marginBottom: 30 }}>
          <Grid container spacing={5}>
            {typeof nationalCard === "object" ? (
              <Grid item xs={6}>
                <img
                  src={`${newLocalUrl}/img/${nationalCard.file}`}
                  style={{
                    width: "100%",
                    margin: "10px 0",
                  }}
                  alt=""
                />
              </Grid>
            ) : null}
            {typeof eduCertif === "object" ? (
              <Grid item xs={6}>
                <img
                  src={`${newLocalUrl}/img/${eduCertif.file}`}
                  style={{
                    width: "100%",
                    margin: "10px 0",
                  }}
                  alt=""
                />
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </div>
    </Fragment>
  );
};

export default Pdf;
