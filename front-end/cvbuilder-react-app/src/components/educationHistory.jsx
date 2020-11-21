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
import { Autocomplete } from "@material-ui/lab";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ResumeContext from "../context/resumeContext";
import { saveEducationHistories } from "../services/resumeService";
import { useStyles } from "../utils/styles";
import provinces from "../utils/provinces.json";
import cities from "../utils/cities.json";

const EducationHistory = () => {
  const [inEdu, setinEdu] = useState(false);
  const [citiesFiltered, setcitiesFiltered] = useState([]);
  const [cityState, setcityState] = useState("");

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
  } = context.allResume.educationHistories.length
    ? context.allResume.educationHistories[
        context.allResume.educationHistories.length - 1
      ]
    : [{}];

  const handleChangeProvince = (e, newValue) => {
    setcityState("");
    if (newValue) {
      setcitiesFiltered(
        cities.filter((city) => city.province == newValue.title)
      );
    }
  };

  useEffect(() => {
    setinEdu(stillStudying);
    if (uniCity) {
      setcityState({ city: uniCity });
    }
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
    const stillStudying = Boolean(inEdu);

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
      context.initializeData();
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
              <Select name="sectionEdu" defaultValue={sectionEdu} required>
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
              required
              defaultValue={fieldEdu}
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="گرایش/تخصص"
              name="orientationEdu"
              required
              defaultValue={orientationEdu}
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع موسسه</InputLabel>
              <Select name="uniType" required defaultValue={uniType}>
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
              required
              defaultValue={uniName}
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="معدل"
              name="averageEdu"
              required
              defaultValue={averageEdu}
              type="number"
              inputProps={{ step: "0.01" }}
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
            <FormControl className={classes.formControl}>
              <InputLabel>کشور</InputLabel>
              <Select name="uniCountry" defaultValue={uniCountry} required>
                <MenuItem value={"ایران"}>ایران</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Autocomplete
              options={provinces}
              getOptionLabel={(option) => option.title}
              className={classes.formControl}
              defaultValue={{ title: uniProvince }}
              onChange={handleChangeProvince}
              required
              renderInput={(params) => (
                <TextField name {...params} name="uniProvince" label="استان" />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Autocomplete
              options={citiesFiltered}
              getOptionLabel={(option) => option.city}
              label="شهر"
              defaultValue={{ city: uniCity }}
              className={classes.formControl}
              value={cityState}
              onChange={(e, newValue) => setcityState(newValue)}
              required
              renderInput={(params) => (
                <TextField {...params} name="uniCity" label="استان" />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <TextField
              className={classes.formControl}
              label="ورود"
              name="startEdu"
              required
              defaultValue={startEdu}
              placeholder="سال"
              type="number"
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <TextField
              className={classes.formControl}
              label="فراغت"
              name="endEdu"
              required={!Boolean(endEdu)}
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
