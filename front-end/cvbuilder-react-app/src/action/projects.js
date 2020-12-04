
export const changeprojectTitle = (event, index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList[index].projectTitle = event.target.value;
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}

export const changeprojectEmployer = (event, index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList[index].projectEmployer = event.target.value;
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}

export const changeprojectHyperlink = (event, index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList[index].projectHyperlink = event.target.value;
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}

export const changestartProjectMonth = (event, index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList[index].startProjectMonth = event.target.value;
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}

export const changestartProjectYear = (event, index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList[index].startProjectYear = event.target.value;
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}

export const changeendProjectMonth = (event, index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList[index].endProjectMonth = event.target.value;
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}

export const changeendProjectYear = (event, index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList[index].endProjectYear = event.target.value;
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}

export const changeprojectDescription = (event, index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList[index].projectDescription = event.target.value;
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}


export const addProject = () => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        projectList.push({
            projectTitle: "",
            projectEmployer: "",
            projectHyperlink: "",
            startProjectMonth: "",
            startProjectYear: "",
            endProjectMonth: "",
            endProjectYear: "",
            projectDescription: ""
        })
        const projects = [...projectList];
        dispatch({ type: "ADD_PROJECTS", payload: projects });
    }
}

export const removeProject = (index) => {
    return (dispatch, getState) => {
        const projectList = [...getState().projects];
        const projects = [...projectList.filter((Project, inx) => inx !== index)];
        dispatch({ type: "DELETE_PROJECTS", payload: projects });
    }
}

export const setAllprojects = (projectList) => {
    return (dispatch) => {
        const projects = [...projectList];
        dispatch({ type: "UPDATE_PROJECTS", payload: projects });
    }
}