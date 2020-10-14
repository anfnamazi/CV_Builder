import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "../utils/styles";

const Project = () => {
  const classes = useStyles();
  return (
    <form>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        تحقیقات و مقالات
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid sm={3} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع اثر</InputLabel>
              <Select name="researchType"></Select>
            </FormControl>
          </Grid>
          <Grid sm={9} item>
            <TextField
              label="عنوان"
              name="researchTitle"
              className={classes.formControl}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2} style={{ marginTop: 20 }}>
          <Grid sm={3} item>
            <TextField
              label="ناشر"
              name="publisher"
              className={classes.formControl}
            />
          </Grid>
          <Grid sm={5} item>
            <TextField
              label="لینک مرتبط"
              name="researchHyperlink"
              className={classes.formControl}
            />
          </Grid>
          <Grid sm={4} item>
            <InputLabel>تاریخ</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Select
                  name="researchMonth"
                  className={classes.formControl}
                  defaultValue="def"
                >
                  <MenuItem disabled value="def">
                    ماه
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="researchYear"
                  type="number"
                  placeholder="سال"
                  className={classes.formControl}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item justify="center" spacing={2} style={{ marginTop: 20 }}>
          <TextField
            className={classes.formControl}
            name="researchDescription"
            multiline
            label="توضیحات"
          />
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        پروژه ها
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid sm={8} item>
            <TextField
              label="عنوان"
              name="projectTitle"
              className={classes.formControl}
            />
          </Grid>
          <Grid sm={4} item>
            <TextField
              label="کارفرما/درخواست کننده"
              name="projectEmployer"
              className={classes.formControl}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2} style={{ marginTop: 20 }}>
          <Grid sm={8} item>
            <TextField
              label="لینک مرتبط"
              name="projectHyperlink"
              className={classes.formControl}
            />
          </Grid>
          <Grid sm={4} item>
            <InputLabel>تاریخ</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Select
                  name="projectMonth"
                  className={classes.formControl}
                  defaultValue="def"
                >
                  <MenuItem disabled value="def">
                    ماه
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="projectYear"
                  type="number"
                  placeholder="سال"
                  className={classes.formControl}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item justify="center" spacing={2} style={{ marginTop: 20 }}>
          <TextField
            className={classes.formControl}
            name="projectDescription"
            multiline
            label="توضیحات"
          />
        </Grid>
      </Paper>
    </form>
  );
};

export default Project;
