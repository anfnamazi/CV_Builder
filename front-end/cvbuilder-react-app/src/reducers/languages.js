export const languagesReducer = (state = [{
    Name: "",
    readSkill: null,
    writeSkill: null,
    hearSkill: null,
    speakSkill: null,
    cert: { name: "لطفا مدرک مربوطه را بارگذاری کنید." }
}], action) => {
    switch (action.type) {
        case "ADD_LANG":
            return [...action.payload];
        case "DELETE_LANG":
            return [...action.payload];
        case "UPDATE_LANG":
            return [...action.payload];

        default:
            return state;
    }
}