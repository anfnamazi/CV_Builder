import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useStyles } from "../../utils/styles";
import { Close, Help } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import {
  changeAverageEdu,
  changeEndEdu,
  changeFieldEdu,
  changeOrientationEdu,
  changeSectionEdu,
  changeStartEdu,
  changeStillStudying,
  changeuniCity,
  changeUniCountry,
  changeUniName,
  changeUniProvince,
  changeUniType,
  removeEdu,
} from "../../action/edus";
import provinces from "../../utils/provinces.json";
import cities from "../../utils/cities.json";

const Edu = ({ edu, index, length }) => {
  const citiesFiltered = [
    ...cities.filter((city) => city.province == edu.uniProvince),
  ];

  const sectionEduList = [
    "دیپلم",
    "کاردانی",
    "کارشناسی",
    "کارشناسی ارشد",
    "دکتری",
    "حوزوی",
  ];
  const uniTypeList = ["دولتی", "غیرانتفاعی", "آزاد", "پیام نور"];

  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <Paper
      style={{ padding: "25px 30px", marginBottom: 15, position: "relative" }}
    >
      {length > 1 ? (
        <IconButton
          color="secondary"
          onClick={() => dispatch(removeEdu(index))}
          size="small"
          style={{ position: "absolute", top: 5, left: 5 }}
        >
          <Close />
        </IconButton>
      ) : null}
      <Grid container justify="center" spacing={2}>
        <Grid xs={6} sm={2} item>
          <FormControl className={classes.formControl}>
            <InputLabel>مقطع</InputLabel>
            <Select
              onChange={(e) => dispatch(changeSectionEdu(e, index))}
              name="sectionEdu"
              value={edu.sectionEdu}
              required
            >
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
            onBlur={(e) => dispatch(changeFieldEdu(e, index))}
            name="fieldEdu"
            required
            key={Math.random()}
            defaultValue={edu.fieldEdu}
          />
        </Grid>
        <Grid xs={6} sm={2} item>
          <TextField
            className={classes.formControl}
            label="گرایش/تخصص"
            onBlur={(e) => dispatch(changeOrientationEdu(e, index))}
            name="orientationEdu"
            required
            key={Math.random()}
            defaultValue={edu.orientationEdu}
          />
        </Grid>
        <Grid xs={6} sm={2} item>
          <FormControl className={classes.formControl}>
            <InputLabel>نوع موسسه</InputLabel>
            <Select
              onChange={(e) => dispatch(changeUniType(e, index))}
              name="uniType"
              required
              value={edu.uniType}
            >
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
            onBlur={(e) => dispatch(changeUniName(e, index))}
            name="uniName"
            required
            key={Math.random()}
            defaultValue={edu.uniName}
          />
        </Grid>
        <Grid xs={6} sm={2} item>
          <TextField
            className={classes.formControl}
            label="معدل"
            onBlur={(e) => dispatch(changeAverageEdu(e, index))}
            name="averageEdu"
            required
            key={Math.random()}
            defaultValue={edu.averageEdu}
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
            <Select
              onChange={(e) => dispatch(changeUniCountry(e, index))}
              name="uniCountry"
              value={edu.uniCountry}
              required
            >
              <MenuItem value={"ایران"}>ایران</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Autocomplete
            options={provinces}
            getOptionLabel={(option) => option.title}
            className={classes.formControl}
            value={{ title: edu.uniProvince }}
            onChange={(e, newValue) =>
              newValue
                ? dispatch(changeUniProvince(newValue.title, index))
                : dispatch(changeUniProvince("", index))
            }
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
            value={{ city: edu.uniCity }}
            className={classes.formControl}
            onChange={(e, newValue) =>
              newValue
                ? dispatch(changeuniCity(newValue.city, index))
                : dispatch(changeuniCity("", index))
            }
            required
            renderInput={(params) => (
              <TextField {...params} name="uniCity" label="شهر" />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            className={classes.formControl}
            label="ورود"
            onBlur={(e) => dispatch(changeStartEdu(e, index))}
            name="startEdu"
            required
            key={Math.random()}
            defaultValue={edu.startEdu}
            placeholder="سال"
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            className={classes.formControl}
            label="فراغت"
            onBlur={(e) => dispatch(changeEndEdu(e, index))}
            name="endEdu"
            required={!Boolean(edu.stillStudying)}
            key={Math.random()}
            defaultValue={edu.endEdu}
            // defaultValue={edu.stillStudying ? "" : null}
            disabled={edu.stillStudying}
            placeholder="سال"
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <Tooltip title="لورم ایپسوم">
            <FormControlLabel
              control={
                <Checkbox
                  checked={edu.stillStudying}
                  onChange={(e) => dispatch(changeStillStudying(e, index))}
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
  );
};

export default Edu;
