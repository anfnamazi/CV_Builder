import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
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
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              name="jobTitle"
              label="سمت شغلی"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              name="jobGroup"
              label="گروه شغلی"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              name="jobCenter"
              label="مرکز شغلی"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              name="titleCenter"
              label="عنوان مرکز"
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>نحوه همکاری</InputLabel>
              <Select name="cooperateType"></Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>سطح ارشدیت</InputLabel>
              <Select name="seniorLevel"></Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="کشور"
              name="jobCountry"
              defaultValue="ایران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="استان"
              name="jobProvince"
              defaultValue="تهران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
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
          <Grid item xs={6} sm={4}>
            <InputLabel>شروع</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={7}>
                <Select
                  name="startJobMonth"
                  className={classes.formControl}
                  defaultValue="def"
                >
                  <MenuItem disabled value="def">
                    ماه
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} sm={5}>
                <TextField
                  className={classes.formControl}
                  name="startJobYear"
                  type="number"
                  placeholder="سال"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4}>
            <InputLabel>اتمام</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={7}>
                <Select
                  name="endJobMonth"
                  className={classes.formControl}
                  disabled={inJob}
                  value={inJob ? "" : "def"}
                  defaultValue="def"
                >
                  <MenuItem disabled value="def">
                    ماه
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} sm={5}>
                <TextField
                  className={classes.formControl}
                  name="endJobYear"
                  type="number"
                  disabled={inJob}
                  value={inJob ? "" : null}
                  placeholder="سال"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4}>
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
