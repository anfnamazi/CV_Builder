
export const changeSectionEdu = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].sectionEdu = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeFieldEdu = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].fieldEdu = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeOrientationEdu = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].orientationEdu = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeUniType = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].uniType = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeUniName = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].uniName = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeAverageEdu = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].averageEdu = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeUniCountry = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].uniCountry = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeUniProvince = (value, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].uniCity = "";
        eduList[index].uniProvince = value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeuniCity = (value, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].uniCity = value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeStartEdu = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].startEdu = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeEndEdu = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].endEdu = event.target.value;
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const changeStillStudying = (event, index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList[index].stillStudying = event.target.checked;
        eduList[index].endEdu = "";
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const setAllEdus = (eduList) => {
    return (dispatch) => {
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const addEdu = () => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        eduList.push({
            sectionEdu: "",
            fieldEdu: "",
            orientationEdu: "",
            uniType: "",
            uniName: "",
            averageEdu: "",
            uniCountry: "",
            uniProvince: "",
            uniCity: "",
            startEdu: "",
            endEdu: "",
            stillStudying: false,
        })
        const edus = [...eduList];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
};

export const removeEdu = (index) => {
    return (dispatch, getState) => {
        const eduList = [...getState().edus];
        const edus = [...eduList.filter((value, inx) => inx !== index)];
        dispatch({ type: "UPDATE_EDUS", payload: edus })
    }
}