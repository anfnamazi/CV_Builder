import {
  Button,
  Container,
  CssBaseline,
  Fab,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { useStyles } from "../utils/styles";
import { QontoConnector, useQontoStepIconStyles } from "../utils/uiUtils";
import BaseInfo from "./baseInformation";
import PropTypes from "prop-types";
import EducationHistory from "./educationHistory";
import JobHistory from "./jobHistory";

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <BaseInfo />;
    case 1:
      return <EducationHistory />;
    case 2:
      return <JobHistory />;

    default:
      return "Unknown stepIndex";
  }
}

function getSteps() {
  return [
    "اطلاعات پایه",
    "سوابق تحصیلی",
    "سوابق شغلی",
    "مهارت ها",
    "پروژه ها",
    "دریافت رزومه",
  ];
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
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
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
                  {activeStep === steps.length - 1 ? "ارسال" : "ذخیره و ادامه"}
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
