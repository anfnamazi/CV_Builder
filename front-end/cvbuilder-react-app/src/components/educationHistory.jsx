import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Help } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { useStyles } from "../utils/styles";

const EducationHistory = () => {
  const [inEdu, setinEdu] = useState(false);

  const classes = useStyles();
  return (
    <from>
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
              <Select name="sectionEdu"></Select>
            </FormControl>
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="رشته تحصیلی"
              name="fieldEdu"
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="گرایش/تخصص"
              name="orientationEdu"
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع موسسه</InputLabel>
              <Select name="uniType"></Select>
            </FormControl>
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="عنوان موسسه"
              name="uniName"
            />
          </Grid>
          <Grid xs={6} sm={2} item>
            <TextField
              className={classes.formControl}
              label="معدل"
              name="averageEdu"
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
              defaultValue="ایران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="استان"
              name="uniProvince"
              defaultValue="تهران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="شهر"
              name="uniCity"
              defaultValue="تهران"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="ورود"
              name="startEdu"
              placeholder="سال"
              type="number"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              className={classes.formControl}
              label="فراغت از تحصیل"
              name="endEdu"
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
    </from>
  );
};

export default EducationHistory;
