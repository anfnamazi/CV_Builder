import { Fab, Grid, Hidden, Typography } from "@material-ui/core";
import { SkipPrevious, Add } from "@material-ui/icons";
import React, { useContext } from "react";
import ResumeContext from "../context/resumeContext";
import { useStyles } from "../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { addEdu } from "../action/edus";
import Edu from "./subComponents/edu";
import { saveEducationHistories } from "../services/resumeService";

const EducationHistory = () => {
  const context = useContext(ResumeContext);

  const dispatch = useDispatch();

  const edus = useSelector((state) => state.edus);

  const handleSaveEducationHistories = async () => {
    const response = await saveEducationHistories(edus);
    if (response.status < 210) {
      context.handleNext();
      context.initializeData();
    }
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSaveEducationHistories}>
      <Typography variant="h5" style={{ marginTop: 20 }} gutterBottom>
        سوابق تحصیلی
      </Typography>
      <Typography variant="caption" style={{ color: "gray" }} gutterBottom>
        برای نوشتن سوابق تحصیلی در رزومه، همیشه از بالاترین مدرک خود شروع به
        نوشتن کنید.
      </Typography>
      {edus.map((edu, index) => (
        <Edu edu={edu} index={index} length={edus.length} />
      ))}
      <Grid container spacing={1}>
        <Fab
          color="primary"
          size="small"
          style={{ margin: "auto" }}
          onClick={() => {
            dispatch(addEdu());
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

export default EducationHistory;
