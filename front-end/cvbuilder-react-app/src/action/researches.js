
export const changeresearchType = (event, index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList[index].researchType = event.target.value;
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}

export const changeresearchTitle = (event, index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList[index].researchTitle = event.target.value;
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}

export const changearticleType = (event, index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList[index].articleType = event.target.value;
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}

export const changepublisher = (event, index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList[index].publisher = event.target.value;
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}

export const changeresearchHyperlink = (event, index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList[index].researchHyperlink = event.target.value;
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}

export const changeresearchMonth = (event, index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList[index].researchMonth = event.target.value;
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}

export const changeresearchYear = (event, index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList[index].researchYear = event.target.value;
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}

export const changeresearchDescription = (event, index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList[index].researchDescription = event.target.value;
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}


export const addResearch = () => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        researchList.push({
            researchType: "",
            researchTitle: "",
            articleType: "",
            publisher: "",
            researchHyperlink: "",
            researchMonth: "",
            researchYear: "",
            researchDescription: ""
        })
        const researches = [...researchList];
        dispatch({ type: "ADD_RESEARCHES", payload: researches });
    }
}

export const removeResearch = (index) => {
    return (dispatch, getState) => {
        const researchList = [...getState().researches];
        const researches = [...researchList.filter((research, inx) => inx !== index)];
        dispatch({ type: "DELETE_RESEARCHES", payload: researches });
    }
}

export const setAllresearches = (researchList) => {
    return (dispatch) => {
        const researches = [...researchList];
        dispatch({ type: "UPDATE_RESEARCHES", payload: researches });
    }
}