import {
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Help, SkipPrevious } from "@material-ui/icons";
import React, { Fragment, useContext, useState } from "react";
import { useEffect } from "react";
import ResumeContext from "../context/resumeContext";
import { saveJobHistories } from "../services/resumeService";
import { useStyles } from "../utils/styles";

const JobHistory = () => {
  const [inJob, setinJob] = useState(false);

  const context = useContext(ResumeContext);

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
  } = context.allResume.jobHistories.length
    ? context.allResume.jobHistories[0]
    : [{}];

  useEffect(() => {
    setinJob(stillWorking);
  }, []);

  const jobGroups = ["موسیقی", "تئاتر", " فیلم", "کتاب"];
  const cooperateTypes = [
    "قراردادی تمام وقت",
    "قراردادی پاره وقت",
    "رسمی یا پیمانی",
    "ساعتی",
    "بدون قرارداد",
  ];
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
  const seniorLevels = ["تازه کار", "کارشناس", "خبره"];

  const handleSaveJobHistories = async (event) => {
    event.preventDefault();
    const jobTitle = event.target.jobTitle.value;
    const jobGroup = event.target.jobGroup.value;
    const jobCenter = event.target.jobCenter.value;
    const titleCenter = event.target.titleCenter.value;
    const cooperateType = event.target.cooperateType.value;
    const seniorLevel = event.target.seniorLevel.value;
    const jobCountry = event.target.jobCountry.value;
    const jobProvince = event.target.jobProvince.value;
    const jobCity = event.target.jobCity.value;
    const startJobMonth = event.target.startJobMonth.value;
    const startJobYear = event.target.startJobYear.value;
    const endJobMonth = event.target.endJobMonth.value;
    const endJobYear = event.target.endJobYear.value;
    const income = event.target.income.value;
    const number = event.target.phoneNumber.value;
    const jobDescription = event.target.jobDescription.value;
    const stillWorking = Boolean(inJob);

    const jobsForm = {
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
    };

    const response = await saveJobHistories(jobsForm);
    if (response.status < 210) {
      context.handleNext();
      context.initializeData();
    }
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSaveJobHistories}>
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
                required
                defaultValue={jobTitle}
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
              <Select name="jobGroup" required defaultValue={jobGroup}>
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
              required
              defaultValue={jobCenter}
              label="مرکز شغلی"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              name="titleCenter"
              required
              defaultValue={titleCenter}
              label="عنوان مرکز"
            />
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: 20 }} spacing={2}>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>نحوه همکاری</InputLabel>
              <Select
                name="cooperateType"
                required
                defaultValue={cooperateType}
              >
                {cooperateTypes.map((group) => (
                  <MenuItem value={group}>{group}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>سطح ارشدیت</InputLabel>
              <Select name="seniorLevel" required defaultValue={seniorLevel}>
                {seniorLevels.map((group) => (
                  <MenuItem value={group}>{group}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="کشور"
              name="jobCountry"
              required
              defaultValue={jobCountry}
              // defaultValue="ایران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="استان"
              name="jobProvince"
              defaultValue={jobProvince}
              required
              // defaultValue="تهران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="شهر"
              name="jobCity"
              defaultValue={jobCity}
              required
              // defaultValue="تهران"
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
                  defaultValue={startJobMonth}
                  required
                  className={classes.formControl}
                  // defaultValue="def"
                >
                  <MenuItem disabled value="def">
                    ماه
                  </MenuItem>
                  {months.map((v, k) => (
                    <MenuItem value={k + 1}>{v}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6} sm={5}>
                <TextField
                  className={classes.formControl}
                  name="startJobYear"
                  required
                  defaultValue={startJobYear}
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
                  required={!Boolean(inJob)}
                  defaultValue={endJobMonth}
                  className={classes.formControl}
                  disabled={inJob}
                  // value={inJob ? "" : "def"}
                  // defaultValue="def"
                >
                  <MenuItem disabled value="def">
                    ماه
                  </MenuItem>
                  {months.map((v, k) => (
                    <MenuItem value={k + 1}>{v}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6} sm={5}>
                <TextField
                  className={classes.formControl}
                  name="endJobYear"
                  required={!Boolean(inJob)}
                  defaultValue={endJobYear}
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
              required
              defaultValue={income}
              type="number"
              placeholder="4000000 تومان"
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              label="شماره تماس"
              type="number"
              placeholder="88888888"
              name="phoneNumber"
              required
              defaultValue={number}
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
            defaultValue={jobDescription}
            multiline
            label="وظایف و دستاوردها"
          />
        </Grid>
      </Paper>
      <Fab
        style={{
          position: "fixed",
          bottom: 50,
          left: 50,
        }}
        variant="contained"
        color="primary"
        type="submit"
        // onClick={}
        size="medium"
      >
        <Hidden xsDown>ذخیره و ادامه</Hidden>
        <SkipPrevious className={classes.extendedIcon} />
      </Fab>
    </form>
  );
};

export default JobHistory;
