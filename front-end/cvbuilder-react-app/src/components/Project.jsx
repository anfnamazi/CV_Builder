import {
  Fab,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, Close, SkipPrevious } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  changeendProjectMonth,
  changeendProjectYear,
  changeprojectDescription,
  changeprojectEmployer,
  changeprojectHyperlink,
  changeprojectTitle,
  changestartProjectMonth,
  changestartProjectYear,
  removeProject,
} from "../action/projects";
import {
  addResearch,
  changearticleType,
  changepublisher,
  changeresearchDescription,
  changeresearchHyperlink,
  changeresearchMonth,
  changeresearchTitle,
  changeresearchType,
  changeresearchYear,
  removeResearch,
} from "../action/researches";
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

  const dispatch = useDispatch();

  const researches = useSelector((state) => state.researches);
  const projects = useSelector((state) => state.projects);

  const handleSaveResearches = async (event) => {
    event.preventDefault();
    const responseResearch = await saveResearches(researches);
    const responseProject = await saveProjects(projects);

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
      {researches.map((research, index) => (
        <Paper
          style={{
            padding: "25px 30px",
            marginBottom: 15,
            position: "relative",
          }}
        >
          {researches.length > 1 ? (
            <IconButton
              color="secondary"
              onClick={() => dispatch(removeResearch(index))}
              size="small"
              style={{ position: "absolute", top: 5, left: 5 }}
            >
              <Close />
            </IconButton>
          ) : null}
          <Grid container justify="center" spacing={2}>
            <Grid xs={6} sm={3} item>
              <FormControl className={classes.formControl}>
                <InputLabel>نوع اثر</InputLabel>
                <Select
                  name="researchType"
                  value={research.researchType}
                  onChange={(e) => dispatch(changeresearchType(e, index))}
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
                defaultValue={research.researchTitle}
                onBlur={(e) => dispatch(changeresearchTitle(e, index))}
                className={classes.formControl}
                key={Math.random()}
              />
            </Grid>
            <Grid xs={6} sm={3} item>
              <FormControl className={classes.formControl}>
                <InputLabel>نوع مقاله</InputLabel>
                <Select
                  name="articleType"
                  value={research.articleType}
                  onChange={(e) => dispatch(changearticleType(e, index))}
                  // disabled={researchTypeState === "مقاله" ? false : true}
                >
                  {articleTypeList.map((type) => (
                    <MenuItem value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            spacing={2}
            style={{ marginTop: 20 }}
          >
            <Grid xs={6} sm={3} item>
              <TextField
                label="ناشر"
                name="publisher"
                defaultValue={research.publisher}
                onBlur={(e) => dispatch(changepublisher(e, index))}
                className={classes.formControl}
                key={Math.random()}
              />
            </Grid>
            <Grid xs={6} sm={5} item>
              <TextField
                label="لینک مرتبط"
                name="researchHyperlink"
                defaultValue={research.researchHyperlink}
                onBlur={(e) => dispatch(changeresearchHyperlink(e, index))}
                className={classes.formControl}
                style={{ direction: "ltr" }}
                key={Math.random()}
              />
            </Grid>
            <Grid xs={6} sm={4} item>
              <InputLabel>تاریخ</InputLabel>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Select
                    name="researchMonth"
                    value={research.researchMonth}
                    onChange={(e) => dispatch(changeresearchMonth(e, index))}
                    className={classes.formControl}
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
                    defaultValue={research.researchYear}
                    onBlur={(e) => dispatch(changeresearchYear(e, index))}
                    type="number"
                    placeholder="سال"
                    className={classes.formControl}
                    key={Math.random()}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item justify="center" spacing={2} style={{ marginTop: 20 }}>
            <TextField
              className={classes.formControl}
              name="researchDescription"
              defaultValue={research.researchDescription}
              onBlur={(e) => dispatch(changeresearchDescription(e, index))}
              multiline
              label="توضیحات"
              key={Math.random()}
            />
          </Grid>
        </Paper>
      ))}
      <Grid container spacing={1}>
        <Fab
          color="primary"
          size="small"
          style={{ margin: "auto" }}
          onClick={() => {
            dispatch(addResearch());
          }}
        >
          <Add />
        </Fab>
      </Grid>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        پروژه ها
      </Typography>
      {projects.map((project, index) => (
        <Paper
          style={{
            padding: "25px 30px",
            marginBottom: 15,
            position: "relative",
          }}
        >
          {projects.length > 1 ? (
            <IconButton
              color="secondary"
              onClick={() => dispatch(removeProject(index))}
              size="small"
              style={{ position: "absolute", top: 5, left: 5 }}
            >
              <Close />
            </IconButton>
          ) : null}
          <Grid container justify="center" spacing={2}>
            <Grid xs={6} sm={8} item>
              <TextField
                label="عنوان"
                name="projectTitle"
                key={Math.random()}
                defaultValue={project.projectTitle}
                onBlur={(e) => dispatch(changeprojectTitle(e, index))}
                className={classes.formControl}
              />
            </Grid>
            <Grid xs={6} sm={4} item>
              <TextField
                label="کارفرما/درخواست کننده"
                name="projectEmployer"
                key={Math.random()}
                defaultValue={project.projectEmployer}
                onBlur={(e) => dispatch(changeprojectEmployer(e, index))}
                className={classes.formControl}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            spacing={2}
            style={{ marginTop: 20 }}
          >
            <Grid xs={6} sm={4} item>
              <TextField
                label="لینک مرتبط"
                name="projectHyperlink"
                key={Math.random()}
                defaultValue={project.projectHyperlink}
                onBlur={(e) => dispatch(changeprojectHyperlink(e, index))}
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
                    value={project.startProjectMonth}
                    onChange={(e) =>
                      dispatch(changestartProjectMonth(e, index))
                    }
                    className={classes.formControl}
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
                    key={Math.random()}
                    defaultValue={project.startProjectYear}
                    onBlur={(e) => dispatch(changestartProjectYear(e, index))}
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
                    value={project.endProjectMonth}
                    onChange={(e) => dispatch(changeendProjectMonth(e, index))}
                    className={classes.formControl}
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
                    key={Math.random()}
                    defaultValue={project.endProjectYear}
                    onBlur={(e) => dispatch(changeendProjectYear(e, index))}
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
              key={Math.random()}
              defaultValue={project.projectDescription}
              onBlur={(e) => dispatch(changeprojectDescription(e, index))}
              multiline
              label="توضیحات"
            />
          </Grid>
        </Paper>
      ))}
      <Grid container spacing={1}>
        <Fab
          color="primary"
          size="small"
          style={{ margin: "auto" }}
          onClick={() => {
            dispatch(addProject());
          }}
        >
          <Add />
        </Fab>
      </Grid>
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
