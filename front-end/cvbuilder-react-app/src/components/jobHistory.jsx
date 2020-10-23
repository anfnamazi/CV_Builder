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
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Help } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { useStyles } from "../utils/styles";

const JobHistory = () => {
  const [inJob, setinJob] = useState(false);
  const jobGroups = ["موسیقی", "تئاتر", " فیلم", "کتاب"];

  const classes = useStyles();
  return (
    <form>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        سوابق شغلی
      </Typography>
      <Typography variant="caption" style={{ color: "gray" }} gutterBottom>
        برای نوشتن سوابق شغلی ترتیب زمانی معکوس را رعایت کنید و از آخرین شغلی که
        داشتید یا دارید، شروع به نوشتن کنید.
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={6} sm={3}>
            <Tooltip title="لورم ایپسوم">
              <TextField
                className={classes.formControl}
                name="jobTitle"
                label={
                  <Fragment>
                    سمت شغلی{" "}
                    <Help
                      style={{ fontSize: 14, transform: "rotateY(180deg)" }}
                    />
                  </Fragment>
                }
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>گروه شغلی</InputLabel>
              <Select name="jobGroup">
                {jobGroups.map((group) => (
                  <MenuItem value={group}>{group}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
        <Grid container justify="center" style={{ marginTop: 20 }} spacing={2}>
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
        <Grid
          container
          alignItems="flex-end"
          spacing={2}
          style={{ marginTop: 20 }}
        >
          <Grid item xs={6} sm={4}>
            <TextField
              label="میزان درآمد"
              name="income"
              type="number"
              placeholder="4000000 تومان"
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              label="شماره تماس"
              type="number"
              placeholder="02188888888"
              name="phoneNumber"
              className={classes.formControl}
            />
          </Grid>
        </Grid>
        <Typography
          style={{ marginTop: 20 }}
          variant="body1"
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
