import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { CastForEducation } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";
import { useStyles } from "../utils/styles";

const Skill = () => {
  const [evidence, setevidence] = useState(
    "لطفا مدرک مربوطه را بارگذاری کنید."
  );

  const onChangeEvidence = (event) => {
    setevidence(event.target.files[0].name);
  };

  const classes = useStyles();
  return (
    <form>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        زبان
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid md={4} item>
            <TextField
              className={classes.formControl}
              label="نام زبان"
              name="fieldEdu"
            />
          </Grid>
          <Grid md={2} item>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">خواندن</Typography>
              <Rating size="small" name="readSkill" />
            </Box>
          </Grid>
          <Grid md={2} item>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">نوشتن</Typography>
              <Rating size="small" name="writeSkill" />
            </Box>
          </Grid>
          <Grid md={2} item>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">شنیداری</Typography>
              <Rating size="small" name="hearSkill" />
            </Box>
          </Grid>
          <Grid md={2} item>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">گفتاری</Typography>
              <Rating size="small" name="speakSkill" />
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
                <TextField label="نام مهارت" name="experienceSkillTitle" />
              </Grid>
              <Grid xs={6} item>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">سطح</Typography>
                  <Rating size="small" name="experienceSkillLevel" />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        دوره ها و گواهینامه
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid xs={4} md={3} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع گواهینامه</InputLabel>
              <Select name="certificateType"></Select>
            </FormControl>
          </Grid>
          <Grid xs={8} md={3} item>
            <TextField
              label="عنوان"
              name="certificateTitle"
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
                name="evidence"
                onChange={onChangeEvidence}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        افتخارات
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid xs={12} md={8} item>
            <TextField
              name="honorTitle"
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
                  name="honorMonth"
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
                  name="honorYear"
                  placeholder="سال"
                  type="number"
                  className={classes.formControl}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default Skill;
