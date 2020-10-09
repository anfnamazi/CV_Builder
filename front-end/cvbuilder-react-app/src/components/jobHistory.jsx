import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../utils/styles";

const JobHistory = () => {
  const [inJob, setinJob] = useState(false);

  const classes = useStyles();
  return (
    <form>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        سوابق شغلی
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item sm={3}>
            <TextField
              className={classes.formControl}
              name="jobTitle"
              label="سمت شغلی"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              className={classes.formControl}
              name="jobGroup"
              label="گروه شغلی"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              className={classes.formControl}
              name="jobCenter"
              label="مرکز شغلی"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              className={classes.formControl}
              name="titleCenter"
              label="عنوان مرکز"
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid item sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">نحوه همکاری</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="cooperateType"
              ></Select>
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">سطح ارشدیت</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="seniorLevel"
              ></Select>
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <TextField
              className={classes.formControl}
              label="کشور"
              name="jobCountry"
              defaultValue="ایران"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              className={classes.formControl}
              label="استان"
              name="jobProvince"
              defaultValue="تهران"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              className={classes.formControl}
              label="شهر"
              name="jobCity"
              defaultValue="تهران"
            />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="flex-end"
          spacing={2}
          style={{ marginTop: 20 }}
        >
          <Grid item sm={4}>
            <InputLabel id="demo-simple-select-label">شروع</InputLabel>
            <Grid container spacing={1}>
              <Grid item sm={7}>
                <Select
                  labelId="demo-simple-select-label"
                  name="startJobMonth"
                  className={classes.formControl}
                ></Select>
              </Grid>
              <Grid item sm={5}>
                <TextField
                  className={classes.formControl}
                  name="startJobYear"
                  type="number"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <InputLabel id="demo-simple-select-label">اتمام</InputLabel>
            <Grid container spacing={1}>
              <Grid item sm={7}>
                <Select
                  labelId="demo-simple-select-label"
                  name="endJobMonth"
                  className={classes.formControl}
                  disabled={inJob}
                  value={inJob ? "" : null}
                ></Select>
              </Grid>
              <Grid item sm={5}>
                <TextField
                  className={classes.formControl}
                  name="endJobYear"
                  type="number"
                  disabled={inJob}
                  value={inJob ? "" : null}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={inJob}
                  onChange={(e) => setinJob(e.target.checked)}
                />
              }
              label="مشغول به فعالیت"
            />
          </Grid>
        </Grid>
        <Typography
          style={{ marginTop: 20 }}
          variant="h6"
          display="block"
          gutterBottom
        >
          وظایف / دستاوردها (اختیاری)
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          در این بخش می توانید خیلی خلاصه و کوتاه، وظایف و دستاوردهای خود را به
          تفکیک و جداگانه لیست کنید.
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          برای تفکیک از دکمه Enter استفاده کنید.
        </Typography>
        <Grid item style={{ margin: "10px" }} justify="center" spacing={2}>
          <TextField
            className={classes.formControl}
            name="jobDescription"
            multiline
            label="وظایف و دستاوردها"
          />
        </Grid>
      </Paper>
    </form>
  );
};

export default JobHistory;
