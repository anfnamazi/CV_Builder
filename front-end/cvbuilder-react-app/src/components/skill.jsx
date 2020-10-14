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
import { Rating } from "@material-ui/lab";
import React from "react";
import { useStyles } from "../utils/styles";

const Skill = () => {
  const classes = useStyles();
  return (
    <form>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        زبان
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid sm={3} item>
            <TextField
              className={classes.formControl}
              label="نام زبان"
              name="fieldEdu"
            />
          </Grid>
          <Grid sm={2} item>
            <Box component="fieldset" mb={2} borderColor="transparent">
              <Typography component="legend">خواندن</Typography>
              <Rating size="small" name="readSkill" />
            </Box>
          </Grid>
          <Grid sm={2} item>
            <Box component="fieldset" mb={2} borderColor="transparent">
              <Typography component="legend">نوشتن</Typography>
              <Rating size="small" name="writeSkill" />
            </Box>
          </Grid>
          <Grid sm={2} item>
            <Box component="fieldset" mb={2} borderColor="transparent">
              <Typography component="legend">شنیداری</Typography>
              <Rating size="small" name="hearSkill" />
            </Box>
          </Grid>
          <Grid sm={2} item>
            <Box component="fieldset" mb={2} borderColor="transparent">
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
        <Grid item spacing={3} sm={6}>
          <Paper style={{ padding: "25px 30px" }}>
            <Grid container justify="center" spacing={2}>
              <Grid sm={7} item>
                <TextField label="نام مهارت" name="experienceSkillTitle" />
              </Grid>
              <Grid sm={5} item>
                <Box component="fieldset" mb={2} borderColor="transparent">
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
        <Grid container justify="center" spacing={2}>
          <Grid sm={3} item>
            <FormControl className={classes.formControl}>
              <InputLabel>نوع گواهینامه</InputLabel>
              <Select name="certificateType"></Select>
            </FormControl>
          </Grid>
          <Grid sm={9} item>
            <TextField
              label="عنوان"
              name="certificateTitle"
              className={classes.formControl}
            />
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        افتخارات
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid sm={8} item>
            <TextField
              name="honorTitle"
              label="عنوان"
              className={classes.formControl}
              placeholder="به طور مثال: برنده جایزه، مقاله برتر پژوهشگاه، دانشجوی ممتاز کارشناسی ارشد"
            />
          </Grid>
          <Grid sm={4} item>
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
