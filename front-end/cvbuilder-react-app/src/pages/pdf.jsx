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
  return (
    <Fragment>
      <Grid container style={{ marginTop: 10 }} justify="space-evenly">
        <Button
        onClick={(e)=>window.print()}
        variant="contained" color="primary">
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
                لورم ایپسوم
              </ListItem>
              <ListItem>
                <ListItemText secondary="نام خانوادگی:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان شغلی:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="جنسیت:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="وضعیت تاهل:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="وضعیت سربازی:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="تاریخ تولد:" />
              </ListItem>

              <ListItem>
                <ListItemText secondary="توصیف خلاصه:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="شبکه اجتماعی:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="آی دی مرتبط:" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="ایمیل:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="موبایل:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="تلفن:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="وب سایت:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="کشور:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="استان:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="شهر:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="آدرس:" />
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
                <ListItemText secondary="رشته تحصیلی:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="گرایش/تخصص:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان موسسه:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="معدل:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="نوع موسسه:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان موسسه:" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="کشور:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="استان:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="شهر:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="ورود:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="فراغت از تحصیل:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="در حال تحصیل:" />
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
              </ListItem>
              <ListItem>
                <ListItemText secondary="گروه شغلی:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="مرکز شغلی:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان مرکز:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="نحوه همکاری:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="سطح ارشدیت:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="کشور:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="استان:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="شهر:" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="ماه شروع:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال شروع:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="ماه اتمام:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال شروع:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="مشغول به فعالیت:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="میزان درآمد:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="شماره تماس:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="وظایف و دستاوردها:" />
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
              </ListItem>
              <ListItem>
                <ListItemText secondary="عنوان:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="نوع مقاله:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="ناشر:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="لینک مرتبط:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="تاریخ:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="توضیحات:" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText secondary="عنوان:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="کارفرما/درخواست کننده:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="لینک مرتبط:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="ماه شروع:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال شروع:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="ماه اتمام:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="سال اتمام:" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="توضیحات:" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Pdf;
