import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
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
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  CastForEducation,
  Check,
  Help,
  PhotoCamera,
  RecentActors,
  SkipPrevious,
} from "@material-ui/icons";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { Fragment, useContext, useState, useEffect } from "react";
import ResumeContext from "../context/resumeContext";
import { useStyles } from "../utils/styles";
import {
  saveBaseInfo,
  saveContactInfo,
  saveDocsInfo,
} from "../services/resumeService";
import config from "../config.json";
import provinces from "../utils/provinces.json";
import cities from "../utils/cities.json";
import { Autocomplete } from "@material-ui/lab";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const BaseInfo = () => {
  const [personImage, setpersonImage] = useState(
    require("../assets/images/person.png")
  );
  const [idCard, setidCard] = useState("لطفا کارت ملی خود را بارگذاری کنید.");
  const [evidence, setevidence] = useState(
    "لطفا مدرک تحصیلی خود را بارگذاری کنید."
  );
  const [birth, setbirth] = useState(new Date().setFullYear(2002));
  const [citiesFiltered, setcitiesFiltered] = useState([]);
  const [cityState, setcityState] = useState("");

  const socialMediaList = [
    "تلگرام",
    "واتساپ",
    "اینستاگرام",
    "توییتر",
    "فیس بوک",
    "سروش",
    "ایتا",
  ];

  const context = useContext(ResumeContext);

  const {
    firstName,
    lastName,
    job,
    birthDay,
    gender,
    marital,
    military,
    description,
    image,
  } = context.allResume.userBaseInfo;

  const {
    email,
    phone,
    tel,
    webPage,
    country,
    province,
    city,
    address,
    socialMediaName,
    socialMediaId,
  } = context.allResume.contactInfo;
  const docs = context.allResume.docs;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setpersonImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onChangeIdCard = (event) => {
    setidCard(event.target.files[0].name);
  };

  const onChangeEvidence = (event) => {
    setevidence(event.target.files[0].name);
  };

  const handleSaveBaseInfo = async (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const job = event.target.job.value;
    const gender = event.target.gender.value;
    const marital = event.target.marital.value;
    const military = event.target.military.value;
    const description = event.target.description.value;
    const image = event.target.image.files[0];
    const birthDay = new Date(birth).toLocaleDateString("en-CA");

    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const tel = event.target.tel.value;
    const webPage = event.target.webPage.value;
    const country = event.target.country.value;
    const province = event.target.province.value;
    const city = event.target.city.value;
    const address = event.target.address.value;
    const socialMediaName = event.target.socialMediaName.value;
    const socialMediaId = event.target.socialMediaId.value;

    const nationalCard = event.target.nationalCard.files[0];
    const eduCertif = event.target.eduCertif.files[0];

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("job", job);
    formData.append("gender", gender);
    formData.append("marital", marital);
    formData.append("military", military);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("birthDay", birthDay);

    const nationalCardFormData = new FormData();
    const eduCertifFormData = new FormData();

    if (nationalCard) {
      nationalCardFormData.append("docType", "nationalCard");
      nationalCardFormData.append("file", nationalCard);
    }
    if (eduCertif) {
      eduCertifFormData.append("docType", "eduCertif");
      eduCertifFormData.append("file", eduCertif);
    }

    const contactForm = {
      email,
      phone,
      tel,
      webPage,
      country,
      province,
      city,
      address,
      socialMediaName,
      socialMediaId,
    };

    const response = await saveBaseInfo(formData);

    const response2 = await saveContactInfo(contactForm);

    if (nationalCard) {
      const response3 = await saveDocsInfo(nationalCardFormData, docs[0]._id);
    }
    if (eduCertif) {
      const response4 = await saveDocsInfo(eduCertifFormData, docs[1]._id);
    }

    if (response.status < 210 && response2.status < 210) {
      context.handleNext();
      context.initializeData();
    }
  };

  const handleChangeProvince = (e, newValue) => {
    setcityState("");
    if (newValue) {
      setcitiesFiltered(
        cities.filter((city) => city.province == newValue.title)
      );
    }
  };

  useEffect(() => {
    if (birthDay) {
      setbirth(new Date(birthDay));
    }
    if (image) {
      setpersonImage(`${config.local_api}/img/${image}`);
    }
    if (city) {
      setcityState({ city });
    }
    if (Boolean(docs[0]) && Boolean(docs[1])) {
      setidCard(<Check />);
      setevidence(<Check />);
    }
  }, []);

  const classes = useStyles();

  return (
    <form onSubmit={handleSaveBaseInfo}>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        اطلاعات پایه
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid style={{ maxHeight: 300, textAlign: "center" }} md={2} item>
            <img
              src={personImage}
              style={{ height: 100, width: 100, borderRadius: "50%" }}
              alt=""
            />
            <input
              accept="image/*"
              style={{ opacity: 0, width: 1, height: 1 }}
              onChange={onImageChange}
              id="icon-button-file"
              type="file"
              name="image"
              // required={!Boolean(image)}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="small"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
          <Grid item md={10} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid xs={6} sm={4} item>
                <TextField
                  className={classes.formControl}
                  label="نام"
                  name="firstName"
                  defaultValue={firstName}
                  required
                />
              </Grid>
              <Grid xs={6} sm={4} item>
                <TextField
                  className={classes.formControl}
                  label="نام خانوادگی"
                  name="lastName"
                  defaultValue={lastName}
                  required
                />
              </Grid>
              <Grid xs={6} sm={4} item>
                <FormControl className={classes.formControl}>
                  <InputLabel>جنسیت</InputLabel>
                  <Select name="gender" defaultValue={gender} required>
                    <MenuItem value={"مرد"}>مرد</MenuItem>
                    <MenuItem value={"زن"}>زن</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid xs={6} sm={4} item>
                <Tooltip title="لورم ایپسوم">
                  <TextField
                    className={classes.formControl}
                    label={
                      <Fragment>
                        عنوان شغلی{" "}
                        <Help
                          style={{
                            fontSize: 14,
                            transform: "rotateY(180deg)",
                          }}
                        />
                      </Fragment>
                    }
                    name="job"
                    defaultValue={job}
                    placeholder="مثال: برنامه نویس وب یا ..."
                    required
                  />
                </Tooltip>
              </Grid> */}
            </Grid>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid xs={6} sm={3} item>
                <FormControl className={classes.formControl}>
                  <InputLabel>وضعیت تاهل</InputLabel>
                  <Select name="marital" defaultValue={marital} required>
                    <MenuItem value={"مجرد"}>مجرد</MenuItem>
                    <MenuItem value={"متاهل"}>متاهل</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6} sm={5} item>
                <FormControl className={classes.formControl}>
                  <InputLabel>وضعیت سربازی</InputLabel>
                  <Select name="military" defaultValue={military} required>
                    <MenuItem value={"مشمول"}>مشمول</MenuItem>
                    <MenuItem value={"در حال خدمت"}>در حال خدمت</MenuItem>
                    <MenuItem value={"پایان خدمت"}>پایان خدمت</MenuItem>
                    <MenuItem value={"معاف"}>معاف</MenuItem>
                    <MenuItem value={"معافیت تحصیلی"}>معافیت تحصیلی</MenuItem>
                    <MenuItem value={"معافیت غیر پزشکی"}>
                      معافیت غیر پزشکی
                    </MenuItem>
                    <MenuItem value={"معافیت پزشکی"}>معافیت پزشکی</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <Grid item xs={6} sm={4}>
                  <DatePicker
                    className={classes.formControl}
                    label="تاریخ تولد"
                    name="birthDay"
                    value={birth}
                    defaultValue={birthDay}
                    clearable
                    okLabel="تأیید"
                    cancelLabel="لغو"
                    clearLabel="پاک کردن"
                    maxDate={new Date()}
                    labelFunc={(date) =>
                      date ? date.format("jYYYY/jMM/jDD") : ""
                    }
                    onChange={setbirth}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        اطلاعات تماس
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              label="ایمیل"
              name="email"
              defaultValue={email}
              style={{ direction: "ltr" }}
              placeholder="example@domain.com"
              inputMode="email"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              label="موبایل"
              name="phone"
              defaultValue={phone}
              type="number"
              style={{ direction: "ltr" }}
              placeholder="09123456789"
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              label="تلفن"
              name="tel"
              defaultValue={tel}
              type="number"
              style={{ direction: "ltr" }}
              InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
              placeholder="88888888"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              className={classes.formControl}
              label="وب سایت"
              name="webPage"
              defaultValue={webPage}
              type="text"
              placeholder="www."
              style={{ direction: "ltr" }}
            />
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 20 }} spacing={2}>
          <Grid item xs={6} sm={2}>
            <FormControl className={classes.formControl}>
              <InputLabel>کشور</InputLabel>
              <Select name="country" defaultValue={country} required>
                <MenuItem value={"ایران"}>ایران</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Autocomplete
              options={provinces}
              getOptionLabel={(option) => option.title}
              className={classes.formControl}
              defaultValue={{ title: province }}
              onChange={handleChangeProvince}
              required
              renderInput={(params) => (
                <TextField name {...params} name="province" label="استان" />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Autocomplete
              options={citiesFiltered}
              getOptionLabel={(option) => option.city}
              label="شهر"
              defaultValue={{ city }}
              className={classes.formControl}
              value={cityState}
              onChange={(e, newValue) => setcityState(newValue)}
              required
              renderInput={(params) => (
                <TextField {...params} name="city" label="شهر" />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              className={classes.formControl}
              label="آدرس"
              name="address"
              multiline
              defaultValue={address}
              required
            />
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        مدارک
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <div class="file-drop-area">
              <span class="fake-btn">
                <RecentActors />
              </span>
              <span class="file-msg">{idCard}</span>
              <input
                class="file-input"
                type="file"
                name="nationalCard"
                // defaultValue={docs[0].file}
                onChange={onChangeIdCard}
                required={!Boolean(docs[0])}
              />
            </div>
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
                name="eduCertif"
                onChange={onChangeEvidence}
                // required={!Boolean(docs[1])}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      {/* <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        توصیف خلاصه
      </Typography>
      <Paper style={{ padding: "25px 30px" }}>
        <Grid item justify="center" spacing={2}>
          <TextField
            className={classes.formControl}
            name="description"
            defaultValue={description}
            multiline
            label="توصیف خلاصه"
            placeholder="برای مثال : 
            گرافیست با استعداد و علاقه مند به پیشرفت با داشتن مهارت های پیشرفته طراحی، ...."
          />
        </Grid>
      </Paper> */}
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        شبکه اجتماعی
      </Typography>
      <Grid container spacing={1}>
        <Grid item spacing={3} xs={12} sm={6}>
          <Paper style={{ padding: "25px 30px" }}>
            <Grid container justify="center" spacing={2}>
              <Grid xs={6} item>
                <FormControl className={classes.formControl}>
                  <InputLabel>شبکه اجتماعی</InputLabel>
                  <Select name="socialMediaName" defaultValue={socialMediaName}>
                    {socialMediaList.map((socialMedia) => (
                      <MenuItem value={socialMedia}>{socialMedia}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6} item>
                <TextField
                  label="آی دی مرتبط"
                  name="socialMediaId"
                  defaultValue={socialMediaId}
                  className={classes.formControl}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
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

export default BaseInfo;
