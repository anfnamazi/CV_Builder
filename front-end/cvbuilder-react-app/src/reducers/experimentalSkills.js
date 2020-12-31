export const experimentalSkillsReducer = (state = [{
    Name: "",
    skillLevel: null,
    description: "",
    cert: { name: "لطفا مدرک مربوطه را بارگذاری کنید." },
    type: ""
}], action) => {
    switch (action.type) {
        case "ADD_EXSKILLS":
            return [...action.payload];
        case "DELETE_EXSKILLS":
            return [...action.payload];
        case "UPDATE_EXSKILLS":
            return [...action.payload];

        default:
            return state;
    }
}