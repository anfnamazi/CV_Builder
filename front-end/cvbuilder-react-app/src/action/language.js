export const changelanguage = (event, index) => {
    return (dispatch, getState) => {
        const langList = [...getState().languages];
        langList[index].language = event.target.value;
        const languages = [...langList];
        dispatch({ type: "UPDATE_LANG", payload: languages });
    }
}

export const changereadSkill = (event, index) => {
    return (dispatch, getState) => {
        const langList = [...getState().languages];
        langList[index].readSkill = event.target.value;
        const languages = [...langList];
        dispatch({ type: "UPDATE_LANG", payload: languages });
    }
}

export const changewriteSkill = (event, index) => {
    return (dispatch, getState) => {
        const langList = [...getState().languages];
        langList[index].writeSkill = event.target.value;
        const languages = [...langList];
        dispatch({ type: "UPDATE_LANG", payload: languages });
    }
}

export const changehearSkill = (event, index) => {
    return (dispatch, getState) => {
        const langList = [...getState().languages];
        langList[index].hearSkill = event.target.value;
        const languages = [...langList];
        dispatch({ type: "UPDATE_LANG", payload: languages });
    }
}

export const changespeakSkill = (event, index) => {
    return (dispatch, getState) => {
        const langList = [...getState().languages];
        langList[index].speakSkill = event.target.value;
        const languages = [...langList];
        dispatch({ type: "UPDATE_LANG", payload: languages });
    }
}

export const addLanguage = () => {
    return (dispatch, getState) => {
        const langList = [...getState().languages];
        langList.push({
            language: "",
            readSkill: null,
            writeSkill: null,
            hearSkill: null,
            speakSkill: null
        })
        const languages = [...langList];
        dispatch({ type: "ADD_LANG", payload: languages });
    }
}

export const removeLanguage = (index) => {
    return (dispatch, getState) => {
        const langList = [...getState().languages];
        const languages = [...langList.filter((lang, inx) => inx !== index)];
        dispatch({ type: "DELETE_LANG", payload: languages });
    }
}

export const setAllLanguages = (langList) => {
    return (dispatch) => {
        const languages = [...langList];
        dispatch({ type: "UPDATE_LANG", payload: languages });
    }
}
