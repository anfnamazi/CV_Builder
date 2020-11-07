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
import React, { useState } from "react";
import { useStyles } from "../utils/styles";

const Project = () => {
  const [researchType, setresearchType] = useState();
  const researchTypeList = ["کتاب", "مقاله", "پایان نامه", "سایر"];
  const articleTypeList = ["داخلی", "خارجی"];
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
  const classes = useStyles();
  return (
    <form>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        تحقیقات و مقالات
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid xs={6} sm={3} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع اثر</InputLabel>
              <Select
                name="researchType"
                onChange={(e) => setresearchType(e.target.value)}
              >
                {researchTypeList.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6} sm={6} item>
            <TextField
              label="عنوان"
              name="researchTitle"
              className={classes.formControl}
            />
          </Grid>
          <Grid xs={6} sm={3} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع مقاله</InputLabel>
              <Select
                name="articleType"
                disabled={researchType === "مقاله" ? false : true}
              >
                {articleTypeList.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2} style={{ marginTop: 20 }}>
          <Grid xs={6} sm={3} item>
            <TextField
              label="ناشر"
              name="publisher"
              className={classes.formControl}
            />
          </Grid>
          <Grid xs={6} sm={5} item>
            <TextField
              label="لینک مرتبط"
              name="researchHyperlink"
              className={classes.formControl}
              style={{ direction: "ltr" }}
            />
          </Grid>
          <Grid xs={6} sm={4} item>
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
                  {months.map((v, k) => (
                    <MenuItem value={k}>{v}</MenuItem>
                  ))}
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
          <Grid xs={6} sm={8} item>
            <TextField
              label="عنوان"
              name="projectTitle"
              className={classes.formControl}
            />
          </Grid>
          <Grid xs={6} sm={4} item>
            <TextField
              label="کارفرما/درخواست کننده"
              name="projectEmployer"
              className={classes.formControl}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2} style={{ marginTop: 20 }}>
          <Grid xs={6} sm={4} item>
            <TextField
              label="لینک مرتبط"
              name="projectHyperlink"
              className={classes.formControl}
              style={{ direction: "ltr" }}
            />
          </Grid>
          <Grid xs={6} sm={4} item>
            <InputLabel>شروع</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Select
                  name="startProjectMonth"
                  className={classes.formControl}
                  defaultValue="def"
                >
                  <MenuItem disabled value="def">
                    ماه
                  </MenuItem>
                  {months.map((v, k) => (
                    <MenuItem value={k}>{v}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="startProjectYear"
                  type="number"
                  placeholder="سال"
                  className={classes.formControl}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={6} sm={4} item>
            <InputLabel>اتمام</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Select
                  name="endProjectMonth"
                  className={classes.formControl}
                  defaultValue="def"
                >
                  <MenuItem disabled value="def">
                    ماه
                  </MenuItem>
                  {months.map((v, k) => (
                    <MenuItem value={k}>{v}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="endProjectYear"
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
