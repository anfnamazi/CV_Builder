export const experimentalSkillsReducer = (state = [{
    experienceSkillTitle: "",
    experienceSkillLevel: null,
    experienceDescription: ""
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