export const changejobTitle = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].jobTitle = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }
}

export const changejobGroup = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].jobGroup = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changejobCenter = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].jobCenter = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changetitleCenter = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].titleCenter = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changecooperateType = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].cooperateType = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changeseniorLevel = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].seniorLevel = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changejobCountry = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].jobCountry = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changejobProvince = (value, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].jobCity = "";
        jobList[index].jobProvince = value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changejobCity = (value, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].jobCity = value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changestartJobMonth = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].startJobMonth = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changestartJobYear = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].startJobYear = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changeendJobMonth = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].endJobMonth = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changeendJobYear = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].endJobYear = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changeincome = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].income = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }

}

export const changenumber = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].number = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }
}

export const changejobDescription = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].jobDescription = event.target.value;
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }
}

export const changestillWorking = (event, index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList[index].stillWorking = event.target.checked;
        jobList[index].endJobYear = "";
        jobList[index].endJobMonth = "";
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }
}

export const removeJob = (index) => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        const jobs = [...jobList.filter((job, inx) => inx !== index)];
        dispatch({ type: "DELETE_JOBS", payload: jobs })
    }
}

export const addJob = () => {
    return (dispatch, getState) => {
        const jobList = [...getState().jobs];
        jobList.push({
            jobTitle: "",
            jobGroup: "",
            // jobCenter: "",
            titleCenter: "",
            cooperateType: "",
            // seniorLevel: "",
            jobCountry: "",
            jobProvince: "",
            jobCity: "",
            startJobMonth: "",
            startJobYear: "",
            endJobMonth: "",
            endJobYear: "",
            income: "",
            number: "",
            jobDescription: "",
            stillWorking: false,
        });
        const jobs = [...jobList];
        dispatch({ type: "ADD_JOBS", payload: jobs })
    }
}

export const setAllJobs = (jobList) => {
    return (dispatch) => {
        const jobs = [...jobList];
        dispatch({ type: "UPDATE_JOBS", payload: jobs })
    }
}
