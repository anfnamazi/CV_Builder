import { Fab, Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { useContext } from "react";
import ResumeContext from "../context/resumeContext";

const FakePage = () => {
  const context = useContext(ResumeContext);
  const { firstName } = context.allResume.userBaseInfo;
  return (
    <Fragment>
      <Grid
        container
        spacing={1}
        justify="center"
        direction="column"
        alignItems="center"
      >
        <img
          src={require("../assets/images/resume-folder-animate.svg")}
          style={{ height: 512, maxWidth: 512, width: "90%" }}
          alt="resume img"
        />
        <Fab variant="contained" color="primary" onClick={context.handleNext}>
          {firstName ? "ویرایش اطلاعات" : "شروع فرآیند"}
        </Fab>
      </Grid>
    </Fragment>
  );
};

export default FakePage;
