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
        <Fab
          variant="contained"
          color="primary"
          style={{ margin: "40px 0" }}
          onClick={context.handleNext}
        >
          {firstName ? "ویرایش اطلاعات" : "شروع فرآیند"}
        </Fab>
      </Grid>
    </Fragment>
  );
};

export default FakePage;
