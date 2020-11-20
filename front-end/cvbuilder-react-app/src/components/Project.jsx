import {
  Fab,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { SkipPrevious } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import ResumeContext from "../context/resumeContext";
import { saveResearches, saveProjects } from "../services/resumeService";
import { useStyles } from "../utils/styles";

const Project = () => {
  // const [researchTypeState, setresearchTypeState] = useState();
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

  const context = useContext(ResumeContext);

  const {
    researchType,
    researchTitle,
    articleType,
    publisher,
    researchHyperlink,
    researchMonth,
    researchYear,
    researchDescription,
  } = context.allResume.researchs.length
    ? context.allResume.researchs[context.allResume.researchs.length - 1]
    : [{}];

  const {
    projectTitle,
    projectEmployer,
    projectHyperlink,
    startProjectMonth,
    startProjectYear,
    endProjectMonth,
    endProjectYear,
    projectDescription,
  } = context.allResume.projects.length
    ? context.allResume.projects[context.allResume.projects.length - 1]
    : [{}];

  const handleSaveResearches = async (event) => {
    event.preventDefault();
    const researchType = event.target.researchType.value;
    const researchTitle = event.target.researchTitle.value;
    const articleType = event.target.articleType.value;
    const publisher = event.target.publisher.value;
    const researchHyperlink = event.target.researchHyperlink.value;
    const researchMonth = event.target.researchMonth.value;
    const researchYear = event.target.researchYear.value;
    const researchDescription = event.target.researchDescription.value;
    const researchForm = {
      researchType,
      researchTitle,
      articleType,
      publisher,
      researchHyperlink,
      researchMonth,
      researchYear,
      researchDescription,
    };

    const projectTitle = event.target.projectTitle.value;
    const projectEmployer = event.target.projectEmployer.value;
    const projectHyperlink = event.target.projectHyperlink.value;
    const startProjectMonth = event.target.startProjectMonth.value;
    const startProjectYear = event.target.startProjectYear.value;
    const endProjectMonth = event.target.endProjectMonth.value;
    const endProjectYear = event.target.endProjectYear.value;
    const projectDescription = event.target.projectDescription.value;
    const projectForm = {
      projectTitle,
      projectEmployer,
      projectHyperlink,
      startProjectMonth,
      startProjectYear,
      endProjectMonth,
      endProjectYear,
      projectDescription,
    };

    const responseResearch = await saveResearches(researchForm);

    const responseProject = await saveProjects(projectForm);
    if (responseResearch.status < 210 && responseProject.status < 210) {
      context.handleNext();
      context.initializeData();
    }
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSaveResearches}>
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
                // onChange={(e) => setresearchTypeState(e.target.value)}
                required
                defaultValue={researchType}
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
              required
              defaultValue={researchTitle}
              className={classes.formControl}
            />
          </Grid>
          <Grid xs={6} sm={3} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع مقاله</InputLabel>
              <Select
                name="articleType"
                required
                defaultValue={articleType}
                // disabled={researchTypeState === "مقاله" ? false : true}
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
              required
              defaultValue={publisher}
              className={classes.formControl}
            />
          </Grid>
          <Grid xs={6} sm={5} item>
            <TextField
              label="لینک مرتبط"
              name="researchHyperlink"
              required
              defaultValue={researchHyperlink}
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
                  required
                  defaultValue={researchMonth}
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
              <Grid item xs={6}>
                <TextField
                  name="researchYear"
                  required
                  defaultValue={researchYear}
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
            defaultValue={researchDescription}
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
              required
              defaultValue={projectTitle}
              className={classes.formControl}
            />
          </Grid>
          <Grid xs={6} sm={4} item>
            <TextField
              label="کارفرما/درخواست کننده"
              name="projectEmployer"
              required
              defaultValue={projectEmployer}
              className={classes.formControl}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2} style={{ marginTop: 20 }}>
          <Grid xs={6} sm={4} item>
            <TextField
              label="لینک مرتبط"
              name="projectHyperlink"
              required
              defaultValue={projectHyperlink}
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
                  required
                  defaultValue={startProjectMonth}
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
              <Grid item xs={6}>
                <TextField
                  name="startProjectYear"
                  defaultValue={startProjectYear}
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
                  defaultValue={endProjectMonth}
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
              <Grid item xs={6}>
                <TextField
                  name="endProjectYear"
                  defaultValue={endProjectYear}
                  required
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
            defaultValue={projectDescription}
            multiline
            label="توضیحات"
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

export default Project;
