import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Close, Help } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { Fragment } from "react";
import { useStyles } from "../../utils/styles";
import provinces from "../../utils/provinces.json";
import cities from "../../utils/cities.json";
import {
  changecooperateType,
  changeendJobMonth,
  changeendJobYear,
  changeincome,
  changejobCenter,
  changejobCity,
  changejobCountry,
  changejobDescription,
  changejobGroup,
  changejobProvince,
  changejobTitle,
  changenumber,
  changeseniorLevel,
  changestartJobMonth,
  changestartJobYear,
  changestillWorking,
  changetitleCenter,
  removeJob,
} from "../../action/jobs";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Job = ({ job, index, length }) => {
  const jobGroups = ["موسیقی", "تئاتر", " فیلم", "کتاب"];
  const cooperateTypes = [
    "قراردادی تمام وقت",
    "قراردادی پاره وقت",
    "رسمی یا پیمانی",
    "ساعتی",
    "بدون قرارداد",
  ];
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
  const seniorLevels = ["تازه کار", "کارشناس", "خبره"];

  const dispatch = useDispatch();

  const citiesFiltered = [
    ...cities.filter((city) => city.province == job.jobProvince),
  ];

  const classes = useStyles();

  return (
    <Paper
      style={{ padding: "25px 30px", marginBottom: 15, position: "relative" }}
    >
      {length > 1 ? (
        <IconButton
          color="secondary"
          onClick={() => dispatch(removeJob(index))}
          size="small"
          style={{ position: "absolute", top: 5, left: 5 }}
        >
          <Close />
        </IconButton>
      ) : null}
      <Grid container justify="center" spacing={2} alignItems="flex-end">
        {/* <Grid item xs={6} sm={3}>
          <TextField
            className={classes.formControl}
            onBlur={(e) => dispatch(changejobCenter(e, index))}
            name="jobCenter"
            required
            key={Math.random()}
            defaultValue={job.jobCenter}
            label="مرکز شغلی"
          />
        </Grid> */}
        <Grid item xs={6} sm={4}>
          <TextField
            className={classes.formControl}
            onBlur={(e) => dispatch(changetitleCenter(e, index))}
            name="titleCenter"
            required
            key={Math.random()}
            defaultValue={job.titleCenter}
            label="عنوان مرکز"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <InputLabel>شروع</InputLabel>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={7}>
              <Select
                onChange={(e) => dispatch(changestartJobMonth(e, index))}
                name="startJobMonth"
                value={job.startJobMonth}
                required
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
            <Grid item xs={6} sm={5}>
              <TextField
                className={classes.formControl}
                onBlur={(e) => dispatch(changestartJobYear(e, index))}
                name="startJobYear"
                required
                key={Math.random()}
                defaultValue={job.startJobYear}
                type="number"
                placeholder="سال"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={4}>
          <InputLabel>اتمام</InputLabel>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={7}>
              <Select
                onChange={(e) => dispatch(changeendJobMonth(e, index))}
                name="endJobMonth"
                required={!Boolean(job.stillWorking)}
                value={job.endJobMonth}
                className={classes.formControl}
                disabled={job.stillWorking}
              >
                <MenuItem disabled value="def">
                  ماه
                </MenuItem>
                {months.map((v, k) => (
                  <MenuItem value={k + 1}>{v}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} sm={5}>
              <TextField
                className={classes.formControl}
                onBlur={(e) => dispatch(changeendJobYear(e, index))}
                name="endJobYear"
                required={!Boolean(job.stillWorking)}
                key={Math.random()}
                defaultValue={job.endJobYear}
                type="number"
                disabled={job.stillWorking}
                placeholder="سال"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Tooltip title="لورم ایپسوم">
            <TextField
              className={classes.formControl}
              onBlur={(e) => dispatch(changejobTitle(e, index))}
              name="jobTitle"
              required
              key={Math.random()}
              defaultValue={job.jobTitle}
              label={
                <Fragment>
                  سمت شغلی{" "}
                  <Help
                    style={{ fontSize: 14, transform: "rotateY(180deg)" }}
                  />
                </Fragment>
              }
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>گروه شغلی</InputLabel>
            <Select
              onChange={(e) => dispatch(changejobGroup(e, index))}
              name="jobGroup"
              required
              value={job.jobGroup}
            >
              {jobGroups.map((group) => (
                <MenuItem value={group}>{group}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>نحوه همکاری</InputLabel>
            <Select
              onChange={(e) => dispatch(changecooperateType(e, index))}
              name="cooperateType"
              required
              value={job.cooperateType}
            >
              {cooperateTypes.map((group) => (
                <MenuItem value={group}>{group}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={6} sm={2}>
          <FormControl className={classes.formControl}>
            <InputLabel>سطح ارشدیت</InputLabel>
            <Select
              onChange={(e) => dispatch(changeseniorLevel(e, index))}
              name="seniorLevel"
              required
              value={job.seniorLevel}
            >
              {seniorLevels.map((group) => (
                <MenuItem value={group}>{group}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={6} sm={2}>
          <FormControl className={classes.formControl}>
            <InputLabel>کشور</InputLabel>
            <Select
              onChange={(e) => dispatch(changejobCountry(e, index))}
              name="jobCountry"
              value={job.jobCountry}
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
            value={{ title: job.jobProvince }}
            onChange={(e, newValue) =>
              newValue
                ? dispatch(changejobProvince(newValue.title, index))
                : dispatch(changejobProvince("", index))
            }
            required
            renderInput={(params) => (
              <TextField name {...params} name="jobProvince" label="استان" />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Autocomplete
            options={citiesFiltered}
            getOptionLabel={(option) => option.city}
            label="شهر"
            value={{ city: job.jobCity }}
            className={classes.formControl}
            onChange={(e, newValue) =>
              newValue
                ? dispatch(changejobCity(newValue.city, index))
                : dispatch(changejobCity("", index))
            }
            required
            renderInput={(params) => (
              <TextField {...params} name="jobCity" label="شهر" />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={job.stillWorking}
                onChange={(e) => dispatch(changestillWorking(e, index))}
              />
            }
            label="مشغول به فعالیت"
          />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="flex-end"
        spacing={2}
        style={{ marginTop: 20 }}
      >
        <Grid item xs={6} sm={4}>
          <TextField
            label="میزان درآمد"
            onBlur={(e) => dispatch(changeincome(e, index))}
            name="income"
            required
            key={Math.random()}
            defaultValue={job.income}
            placeholder="4,000,000"
            className={classes.formControl}
            InputProps={{
              inputComponent: NumberFormatCustom,
              startAdornment: (
                <InputAdornment position="start">تومان</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            label="شماره تماس"
            type="number"
            placeholder="88888888"
            onBlur={(e) => dispatch(changenumber(e, index))}
            name="phoneNumber"
            required
            InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
            key={Math.random()}
            defaultValue={job.number}
            className={classes.formControl}
          />
        </Grid>
      </Grid>
      <Typography
        style={{ marginTop: 20 }}
        variant="body1"
        display="block"
        gutterBottom
      >
        وظایف / دستاوردها (اختیاری)
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        در این بخش می توانید خیلی خلاصه و کوتاه، وظایف و دستاوردهای خود را به
        تفکیک و جداگانه لیست کنید.
      </Typography>
      <Grid item style={{ margin: "10px" }} justify="center" spacing={2}>
        <TextField
          className={classes.formControl}
          onBlur={(e) => dispatch(changejobDescription(e, index))}
          name="jobDescription"
          key={Math.random()}
          defaultValue={job.jobDescription}
          multiline
          label="وظایف و دستاوردها"
        />
      </Grid>
    </Paper>
  );
};

export default Job;
