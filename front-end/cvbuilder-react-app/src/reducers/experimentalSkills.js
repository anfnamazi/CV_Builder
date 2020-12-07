export const experimentalSkillsReducer = (state = [{
    Name: "",
    skillLevel: null,
    description: ""
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