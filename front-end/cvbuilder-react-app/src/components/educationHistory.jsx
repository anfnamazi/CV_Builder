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

const EducationHistory = () => {
  const [inEdu, setinEdu] = useState(false);

  const classes = useStyles();
  return (
    <from>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        سوابق تحصیلی
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid sm={2} item>
            <FormControl className={classes.formControl}>
              <InputLabel>مقطع</InputLabel>
              <Select name="sectionEdu"></Select>
            </FormControl>
          </Grid>
          <Grid sm={2} item>
            <TextField
              className={classes.formControl}
              label="رشته تحصیلی"
              name="fieldEdu"
            />
          </Grid>
          <Grid sm={2} item>
            <TextField
              className={classes.formControl}
              label="گرایش/تخصص"
              name="orientationEdu"
            />
          </Grid>
          <Grid sm={2} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع موسسه</InputLabel>
              <Select name="uniType"></Select>
            </FormControl>
          </Grid>
          <Grid sm={2} item>
            <TextField
              className={classes.formControl}
              label="عنوان موسسه"
              name="uniName"
            />
          </Grid>
          <Grid sm={2} item>
            <TextField
              className={classes.formControl}
              label="معدل"
              name="averageEdu"
            />
          </Grid>
        </Grid>
        <Grid container alignItems="flex-end" spacing={2}>
          <Grid item sm={2}>
            <TextField
              className={classes.formControl}
              label="کشور"
              name="uniCountry"
              defaultValue="ایران"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              className={classes.formControl}
              label="استان"
              name="uniProvince"
              defaultValue="تهران"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              className={classes.formControl}
              label="شهر"
              name="uniCity"
              defaultValue="تهران"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              className={classes.formControl}
              label="ورود"
              name="startEdu"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              className={classes.formControl}
              label="فراغت از تحصیل"
              name="endEdu"
              value={inEdu ? "" : null}
              disabled={inEdu}
            />
          </Grid>
          <Grid item sm={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={inEdu}
                  onChange={(e) => setinEdu(e.target.checked)}
                />
              }
              label="درحال تحصیل"
            />
          </Grid>
        </Grid>
      </Paper>
    </from>
  );
};

export default EducationHistory;
