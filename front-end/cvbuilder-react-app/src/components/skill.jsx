import {
  Box,
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
import { CastForEducation, SkipPrevious } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React, { useContext, useState } from "react";
import ResumeContext from "../context/resumeContext";
import { saveLanguageSkills, saveHonores } from "../services/resumeService";
import { useStyles } from "../utils/styles";

const Skill = () => {
  const [evidence, setevidence] = useState(
    "لطفا مدرک مربوطه را بارگذاری کنید."
  );

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

  const { readSkill, writeSkill, hearSkill, speakSkill } = context.allResume
    .skills.length
    ? context.allResume.skills[context.allResume.skills.length - 2]
    : [{}];

  const { experienceSkillLevel } = context.allResume.skills.length
    ? context.allResume.skills[context.allResume.skills.length - 1]
    : [{}];

  const language = context.allResume.skills.length
    ? context.allResume.skills[context.allResume.skills.length - 2].Name
    : "";

  const experienceSkillTitle = context.allResume.skills.length
    ? context.allResume.skills[context.allResume.skills.length - 1].Name
    : "";

  const { honorTitle, honorMonth, honorYear } = context.allResume.honors.length
    ? context.allResume.honors[context.allResume.honors.length - 1]
    : [{}];

  const onChangeEvidence = (event) => {
    setevidence(event.target.files[0].name);
  };

  const handleSaveSkills = async (event) => {
    event.preventDefault();
    const readSkill = event.target.readSkill.value;
    const language = event.target.language.value;
    const writeSkill = event.target.writeSkill.value;
    const hearSkill = event.target.hearSkill.value;
    const speakSkill = event.target.speakSkill.value;

    const languageForm = {
      readSkill,
      Name: language,
      writeSkill,
      hearSkill,
      speakSkill,
      skillType: "language",
    };

    const experienceSkillTitle = event.target.experienceSkillTitle.value;
    const experienceSkillLevel = event.target.experienceSkillLevel.value;
    const experimentForm = {
      skillType: "Experimental",
      experienceSkillLevel,
      Name: experienceSkillTitle,
    };

    const honorTitle = event.target.honorTitle.value;
    const honorMonth = event.target.honorMonth.value;
    const honorYear = event.target.honorYear.value;

    const honorForm = {
      honorTitle,
      honorMonth,
      honorYear,
    };

    const response = await saveLanguageSkills(languageForm);
    const response2 = await saveLanguageSkills(experimentForm);
    const response3 = await saveHonores(honorForm);
    if (
      response.status < 210 &&
      response2.status < 210 &&
      response3.status < 210
    ) {
      context.handleNext();
      context.initializeData();
    }
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSaveSkills}>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        زبان
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid md={4} item>
            <TextField
              className={classes.formControl}
              label="نام زبان"
              required
              name="language"
              defaultValue={language}
            />
          </Grid>
          <Grid md={2} item>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">خواندن</Typography>
              <Rating
                size="small"
                required
                name="readSkill"
                defaultValue={readSkill}
              />
            </Box>
          </Grid>
          <Grid md={2} item>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">نوشتن</Typography>
              <Rating
                size="small"
                required
                name="writeSkill"
                defaultValue={writeSkill}
              />
            </Box>
          </Grid>
          <Grid md={2} item>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">شنیداری</Typography>
              <Rating
                size="small"
                required
                name="hearSkill"
                defaultValue={hearSkill}
              />
            </Box>
          </Grid>
          <Grid md={2} item>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">گفتاری</Typography>
              <Rating
                size="small"
                required
                name="speakSkill"
                defaultValue={speakSkill}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        مهارت های تجربی
      </Typography>
      <Grid container spacing={1}>
        <Grid item spacing={3} xs={12} sm={6}>
          <Paper style={{ padding: "25px 30px" }}>
            <Grid container justify="center" spacing={2}>
              <Grid xs={6} item>
                <TextField
                  label="نام مهارت"
                  required
                  name="experienceSkillTitle"
                  defaultValue={experienceSkillTitle}
                />
              </Grid>
              <Grid xs={6} item>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">سطح</Typography>
                  <Rating
                    size="small"
                    required
                    name="experienceSkillLevel"
                    defaultValue={experienceSkillLevel}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        دوره ها و گواهینامه
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid xs={4} md={3} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع گواهینامه</InputLabel>
              <Select required name="certificateType"></Select>
            </FormControl>
          </Grid>
          <Grid xs={8} md={3} item>
            <TextField
              label="عنوان"
             required name="certificateTitle"
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div class="file-drop-area">
              <span class="fake-btn">
                <CastForEducation />
              </span>
              <span class="file-msg">{evidence}</span>
              <input
                class="file-input"
                type="file"
               required name="evidence"
                onChange={onChangeEvidence}
              />
            </div>
          </Grid>
        </Grid>
      </Paper> */}
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        افتخارات
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid xs={12} md={8} item>
            <TextField
              required
              name="honorTitle"
              defaultValue={honorTitle}
              label="عنوان"
              className={classes.formControl}
              placeholder="به طور مثال: برنده جایزه، مقاله برتر پژوهشگاه، دانشجوی ممتاز کارشناسی ارشد"
            />
          </Grid>
          <Grid xs={12} md={4} item>
            <InputLabel>تاریخ</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Select
                  required
                  name="honorMonth"
                  defaultValue={honorMonth}
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
                  required
                  name="honorYear"
                  defaultValue={honorYear}
                  placeholder="سال"
                  type="number"
                  className={classes.formControl}
                />
              </Grid>
            </Grid>
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

export default Skill;
