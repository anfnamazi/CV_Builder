export const changeexperienceSkillTitle = (event, index) => {
    return (dispatch, getState) => {
        const exList = [...getState().experimentalSkills];
        exList[index].Name = event.target.value;
        const experimentalSkills = [...exList];
        dispatch({ type: "UPDATE_EXSKILLS", payload: experimentalSkills });
    }
}

export const changeexperienceSkillLevel = (event, index) => {
    return (dispatch, getState) => {
        const exList = [...getState().experimentalSkills];
        exList[index].skillLevel = event.target.value;
        const experimentalSkills = [...exList];
        dispatch({ type: "UPDATE_EXSKILLS", payload: experimentalSkills });
    }
}

export const changeexperienceDescription = (event, index) => {
    return (dispatch, getState) => {
        const exList = [...getState().experimentalSkills];
        exList[index].description = event.target.value;
        const experimentalSkills = [...exList];
        dispatch({ type: "UPDATE_EXSKILLS", payload: experimentalSkills });
    }
}

export const addexperimentalSkill = () => {
    return (dispatch, getState) => {
        const exList = [...getState().experimentalSkills];
        exList.push({
            Name: "",
            skillLevel: null,
            description: ""
        })
        const experimentalSkills = [...exList];
        dispatch({ type: "ADD_EXSKILLS", payload: experimentalSkills });
    }
}

export const removeexperimentalSkill = (index) => {
    return (dispatch, getState) => {
        const exList = [...getState().experimentalSkills];
        const experimentalSkills = [...exList.filter((Ex, inx) => inx !== index)];
        dispatch({ type: "DELETE_EXSKILLS", payload: experimentalSkills });
    }
}

export const setAllexperimentalSkills = (exList) => {
    return (dispatch) => {
        const experimentalSkills = [...exList];
        dispatch({ type: "UPDATE_EXSKILLS", payload: experimentalSkills });
    }
}