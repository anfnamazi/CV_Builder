import { Fab, Grid, Hidden, Typography } from "@material-ui/core";
import { Add, SkipPrevious } from "@material-ui/icons";
import React, { useContext } from "react";
import ResumeContext from "../context/resumeContext";
import { saveJobHistories } from "../services/resumeService";
import { useStyles } from "../utils/styles";
import Job from "./subComponents/job";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../action/jobs";

const JobHistory = () => {
  const context = useContext(ResumeContext);

  const jobs = useSelector((state) => state.jobs);

  const dispatch = useDispatch();

  const handleSaveJobHistories = async (e) => {
    e.preventDefault();
    const response = await saveJobHistories(jobs);
    if (response.status < 210) {
      context.handleNext();
      context.initializeData();
    }
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSaveJobHistories}>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        سوابق شغلی
      </Typography>
      <Typography variant="caption" style={{ color: "gray" }} gutterBottom>
        برای نوشتن سوابق شغلی ترتیب زمانی معکوس را رعایت کنید و از آخرین شغلی که
        داشتید یا دارید، شروع به نوشتن کنید.
      </Typography>
      {jobs.map((job, index) => (
        <Job job={job} index={index} length={jobs.length} />
      ))}
      <Grid container spacing={1}>
        <Fab
          color="primary"
          size="small"
          style={{ margin: "auto" }}
          onClick={() => {
            dispatch(addJob());
          }}
        >
          <Add />
        </Fab>
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
        size="medium"
      >
        <Hidden xsDown>ذخیره و ادامه</Hidden>
        <SkipPrevious className={classes.extendedIcon} />
      </Fab>
    </form>
  );
};

export default JobHistory;
