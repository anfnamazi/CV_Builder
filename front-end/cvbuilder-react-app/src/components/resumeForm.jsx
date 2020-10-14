import {
  Button,
  Container,
  CssBaseline,
  Fab,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import {
  ArrowForward,
  Check,
  Send,
  SkipNext,
  SkipPrevious,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { useStyles } from "../utils/styles";
import { QontoConnector, useQontoStepIconStyles } from "../utils/uiUtils";
import BaseInfo from "./baseInformation";
import PropTypes from "prop-types";
import EducationHistory from "./educationHistory";
import JobHistory from "./jobHistory";
import Skill from "./skill";
import Project from "./Project";

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
      return "Unknown stepIndex";
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
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md" style={{ marginBottom: 50 }}>
        <div className={classes.root}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
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
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<Send style={{ transform: "rotate(180deg)" }} />}
                    >
                      ارسال
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <Fab
                  style={
                    activeStep === 0
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
                  مرحله قبل
                </Fab>
                <Fab
                  style={{
                    position: "fixed",
                    bottom: 50,
                    left: 50,
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleNext}
                  size="medium"
                >
                  ذخیره و ادامه
                  <SkipPrevious className={classes.extendedIcon} />
                </Fab>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default ResumeForm;
