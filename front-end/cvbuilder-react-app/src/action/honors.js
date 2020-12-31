export const changehonorTitle = (event, index) => {
    return (dispatch, getState) => {
        const honorList = [...getState().honors];
        honorList[index].honorTitle = event.target.value;
        const honors = [...honorList];
        dispatch({ type: "UPDATE_HONORS", payload: honors });
    }
}

export const changehonorMonth = (event, index) => {
    return (dispatch, getState) => {
        const honorList = [...getState().honors];
        honorList[index].honorMonth = event.target.value;
        const honors = [...honorList];
        dispatch({ type: "UPDATE_HONORS", payload: honors });
    }
}

export const changehonorYear = (event, index) => {
    return (dispatch, getState) => {
        const honorList = [...getState().honors];
        honorList[index].honorYear = event.target.value;
        const honors = [...honorList];
        dispatch({ type: "UPDATE_HONORS", payload: honors });
    }
}

export const changehonorCert = (event, index) => {
    return (dispatch, getState) => {
        const honorList = [...getState().honors];
        honorList[index].cert = event.target.files[0];
        const honors = [...honorList];
        dispatch({ type: "UPDATE_HONORS", payload: honors });
    }
}

export const changehonorType = (event, index) => {
    return (dispatch, getState) => {
        const honorList = [...getState().honors];
        honorList[index].type = event.target.value;
        const honors = [...honorList];
        dispatch({ type: "UPDATE_HONORS", payload: honors });
    }
}

export const addHonor = () => {
    return (dispatch, getState) => {
        const honorList = [...getState().honors];
        honorList.push({
            honorTitle: "",
            honorMonth: "",
            honorYear: "",
            cert: { name: "لطفا مدرک مربوطه را بارگذاری کنید." },
            type: ""
        })
        const honors = [...honorList];
        dispatch({ type: "ADD_HONORS", payload: honors });
    }
}

export const removeHonor = (index) => {
    return (dispatch, getState) => {
        const honorList = [...getState().honors];
        const honors = [...honorList.filter((honor, inx) => inx !== index)];
        dispatch({ type: "DELETE_HONORS", payload: honors });
    }
}

export const setAllhonors = (honorList) => {
    return (dispatch) => {
        const honors = [...honorList];
        dispatch({ type: "UPDATE_HONORS", payload: honors });
    }
}