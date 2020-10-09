import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React, { useState } from "react";
import { useStyles } from "../utils/styles";

const BaseInfo = () => {
  const [image, setimage] = useState(require("../assets/images/person.png"));

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setimage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const saveBaseInfo = (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const job = event.target.job.value;
    const gender = event.target.gender.value;
    const marital = event.target.marital.value;
    console.log(firstName, lastName, job, gender, marital);
  };

  const classes = useStyles();

  return (
    <form onSubmit={saveBaseInfo}>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        اطلاعات پایه
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid style={{ maxHeight: 300, textAlign: "center" }} md={2} item>
            <img
              src={image}
              style={{ height: 100, width: 100, borderRadius: "50%" }}
              alt=""
            />
            <input
              accept="image/*"
              className={classes.displayNone}
              onChange={onImageChange}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="small"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
          <Grid item md={10} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid xs={4} item>
                <TextField
                  className={classes.formControl}
                  label="نام"
                  name="firstName"
                />
              </Grid>
              <Grid xs={4} item>
                <TextField
                  className={classes.formControl}
                  label="نام خانوادگی"
                  name="lastName"
                />
              </Grid>
              <Grid xs={4} item>
                <TextField
                  className={classes.formControl}
                  label="عوان شغلی"
                  name="job"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid xs={2} item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">جنسیت</InputLabel>
                  <Select labelId="demo-simple-select-label" name="gender">
                    <MenuItem value={"مرد"}>مرد</MenuItem>
                    <MenuItem value={"زن"}>زن</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={2} item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    وضعیت تاهل
                  </InputLabel>
                  <Select labelId="demo-simple-select-label" name="marital">
                    <MenuItem value={"مجرد"}>مجرد</MenuItem>
                    <MenuItem value={"متاهل"}>متاهل</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={3} item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    وضعیت سربازی
                  </InputLabel>
                  <Select labelId="demo-simple-select-label" name="military">
                    <MenuItem value={"مشمول"}>مشمول</MenuItem>
                    <MenuItem value={"در حال خدمت"}>در حال خدمت</MenuItem>
                    <MenuItem value={"پایان خدمت"}>پایان خدمت</MenuItem>
                    <MenuItem value={"معاف"}>معاف</MenuItem>
                    <MenuItem value={"معافیت تحصیلی"}>معافیت تحصیلی</MenuItem>
                    <MenuItem value={"معافیت غیر پزشکی"}>
                      معافیت غیر پزشکی
                    </MenuItem>
                    <MenuItem value={"معافیت پزشکی"}>معافیت پزشکی</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <InputLabel id="demo-simple-select-label">
                  تاریخ تولد
                </InputLabel>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Select
                      labelId="demo-simple-select-label"
                      name="birthDay"
                      className={classes.formControl}
                    ></Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      labelId="demo-simple-select-label"
                      name="birthMonth"
                      className={classes.formControl}
                    ></Select>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      className={classes.formControl}
                      name="birthYear"
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        اطلاعات پایه
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={3}>
            <TextField
              className={classes.formControl}
              label="ایمیل"
              name="email"
              type="email"
              style={{ direction: "ltr" }}
              placeholder="example@domain.com"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              className={classes.formControl}
              label="موبایل"
              name="phone"
              type="number"
              style={{ direction: "ltr" }}
              placeholder="09123456789"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              className={classes.formControl}
              label="تلفن"
              name="tel"
              type="number"
              style={{ direction: "ltr" }}
              placeholder="02188888888"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              className={classes.formControl}
              label="وب سایت"
              name="webPage"
              type="text"
              placeholder="www."
              style={{ direction: "ltr" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              className={classes.formControl}
              label="کشور"
              name="country"
              defaultValue="ایران"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              className={classes.formControl}
              label="استان"
              name="province"
              defaultValue="تهران"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              className={classes.formControl}
              label="شهر"
              name="city"
              defaultValue="تهران"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.formControl}
              label="آدرس"
              name="address"
            />
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        توصیف خلاصه
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid item justify="center" spacing={2}>
          <TextField
            className={classes.formControl}
            name="description"
            multiline
            label="توصیف خلاصه"
            placeholder="برای مثال : 
            گرافیست با استعداد و علاقه مند به پیشرفت با داشتن مهارت های پیشرفته طراحی، ...."
          />
        </Grid>
      </Paper>
    </form>
  );
};

export default BaseInfo;
