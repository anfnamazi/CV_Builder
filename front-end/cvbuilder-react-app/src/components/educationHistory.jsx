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
import React, { Fragment, useContext, useEffect, useState } from "react";
import ResumeContext from "../context/resumeContext";
import { saveEducationHistories } from "../services/resumeService";
import { useStyles } from "../utils/styles";

const EducationHistory = () => {
  const [inEdu, setinEdu] = useState(false);

  const context = useContext(ResumeContext);

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
  } = context.edus[0];

  useEffect(() => {
    setinEdu(stillStudying);
  }, []);

  const sectionEduList = ["فوق دیپلم", "کارشناسی", "کارشناسی ارشد", "دکتری"];
  const uniTypeList = ["دولتی", "غیرانتفاعی", "آزاد", "پیام نور"];

  const handleSaveEducationHistories = async (event) => {
    event.preventDefault();
    const sectionEdu = event.target.sectionEdu.value;
    const fieldEdu = event.target.fieldEdu.value;
    const orientationEdu = event.target.orientationEdu.value;
    const uniType = event.target.uniType.value;
    const uniName = event.target.uniName.value;
    const averageEdu = event.target.averageEdu.value;
    const uniCountry = event.target.uniCountry.value;
    const uniProvince = event.target.uniProvince.value;
    const uniCity = event.target.uniCity.value;
    const startEdu = event.target.startEdu.value;
    const endEdu = event.target.endEdu.value;
    const stillStudying = inEdu;

    const eduHistroiesForm = {
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
    };

    const response = await saveEducationHistories(eduHistroiesForm);
    console.log(response);

    if (response.status < 210) {
      context.handleNext();
    }
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSaveEducationHistories}>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        سوابق تحصیلی
      </Typography>
      <Typography variant="caption" style={{ color: "gray" }} gutterBottom>
        برای نوشتن سوابق تحصیلی در رزومه، همیشه از بالاترین مدرک خود شروع به
        نوشتن کنید.
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid xs={6} sm={2} item>
            <FormControl className={classes.formControl}>
              <InputLabel>مقطع</InputLabel>
              <Select name="sectionEdu" defaultValue={sectionEdu}>
                {sectionEduList.map((section) => (
                  <MenuItem value={section}>{section}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="رشته تحصیلی"
              name="fieldEdu"
              defaultValue={fieldEdu}
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="گرایش/تخصص"
              name="orientationEdu"
              defaultValue={orientationEdu}
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع موسسه</InputLabel>
              <Select name="uniType" defaultValue={uniType}>
                {uniTypeList.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="عنوان موسسه"
              name="uniName"
              defaultValue={uniName}
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="معدل"
              name="averageEdu"
              defaultValue={averageEdu}
              type="number"
            />
          </Grid>
        </Grid>
        <Grid
          container
          style={{ marginTop: 20 }}
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="کشور"
              name="uniCountry"
              defaultValue={uniCountry}
              // defaultValue="ایران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="استان"
              name="uniProvince"
              defaultValue={uniProvince}
              // defaultValue="تهران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="شهر"
              name="uniCity"
              defaultValue={uniCity}
              // defaultValue="تهران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="ورود"
              name="startEdu"
              defaultValue={startEdu}
              placeholder="سال"
              type="number"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="فراغت از تحصیل"
              name="endEdu"
              defaultValue={endEdu}
              value={inEdu ? "" : null}
              disabled={inEdu}
              placeholder="سال"
              type="number"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <Tooltip title="لورم ایپسوم">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={inEdu}
                    onChange={(e) => setinEdu(e.target.checked)}
                  />
                }
                label={
                  <Fragment>
                    درحال تحصیل{" "}
                    <Help
                      style={{ fontSize: 14, transform: "rotateY(180deg)" }}
                    />
                  </Fragment>
                }
              />
            </Tooltip>
          </Grid>
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

export default EducationHistory;
