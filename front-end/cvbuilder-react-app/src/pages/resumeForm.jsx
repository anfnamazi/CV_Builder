import {
  Button,
  CssBaseline,
  Fab,
  Grid,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
  Hidden,
} from "@material-ui/core";
import { ArrowForward, Check, MeetingRoom, SkipNext } from "@material-ui/icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useStyles } from "../utils/styles";
import { QontoConnector, useQontoStepIconStyles } from "../utils/uiUtils";
import BaseInfo from "../components/baseInformation";
import PropTypes from "prop-types";
import EducationHistory from "../components/educationHistory";
import JobHistory from "../components/jobHistory";
import Skill from "../components/skill";
import Project from "../components/Project";
import ResumeContext from "../context/resumeContext";
import { getallResumeByUser } from "../services/resumeService";
import { Redirect } from "react-router-dom";
import FakePage from "../components/fakePage";

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <BaseInfo />;
    case 1:
      return <EducationHistory />;
    case 2:
      return <JobHistory />;
    case 3:
      return <Skill />;
    case 4:
      return <Project />;

    default:
      return <FakePage />;
  }
}

function getSteps() {
  return ["اطلاعات پایه", "سوابق تحصیلی", "سوابق شغلی", "مهارت ها", "پروژه ها"];
}

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ResumeForm = () => {
  const classes = useStyles();
  const [activeStep, setactiveStep] = useState(-1);
  const [allResume, setallResume] = useState({
    educationHistories: [],
    jobHistories: [],
    researchs: [],
    projects: [],
    skills: [],
    honors: [],
    docs: ["", ""],
    userBaseInfo: {},
    contactInfo: {},
  });

  const steps = getSteps();

  const handleNext = () => {
    setactiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setactiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setactiveStep(0);
  };

  const handleStep = (step) => () => {
    setactiveStep(step);
  };

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const response = await getallResumeByUser();

    if (response.status < 210) {
      const { userBaseInfo } = response.data;
      if (userBaseInfo) {
        setallResume({ ...response.data });
      }
    }
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <ResumeContext.Provider
      value={{
        handleNext,
        allResume,
        initializeData,
      }}
    >
      <CssBaseline />
      <div className={classes.root} style={{ marginBottom: 100 }}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <StepButton onClick={handleStep(index)}>{label}</StepButton>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography
                component="h3"
                style={{ textAlign: "center", marginTop: 40 }}
                className={classes.instructions}
              >
                اتمام فرآیند باتشکر
              </Typography>
              <Grid
                container
                spacing={5}
                style={{ marginTop: 20, padding: 20 }}
              >
                <Grid item xs>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleReset}
                    startIcon={<ArrowForward />}
                  >
                    بازگشت به صفحه اول
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Send style={{ transform: "rotate(180deg)" }} />}
                  >
                    ارسال
                  </Button>
                </Grid> */}
              </Grid>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <Fab
                style={
                  activeStep <= 0
                    ? { display: "none" }
                    : {
                        position: "fixed",
                        bottom: 50,
                        right: 50,
                      }
                }
                onClick={handleBack}
                className={classes.backButton}
                variant="contained"
                color="secondary"
                size="medium"
              >
                <SkipNext className={classes.extendedIcon} />
                <Hidden xsDown>مرحله قبل</Hidden>
              </Fab>
            </div>
          )}
        </div>
        <Button
          style={{ position: "fixed", top: 120, left: -5 }}
          color="secondary"
          variant="contained"
          onClick={() => window.location.replace("/logout")}
        >
          <MeetingRoom style={{ marginLeft: 10 }} />
          خروج
        </Button>
      </div>
    </ResumeContext.Provider>
  );
};

export default ResumeForm;
