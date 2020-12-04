export const projectsReducer = (state = [{
    projectTitle: "",
    projectEmployer: "",
    projectHyperlink: "",
    startProjectMonth: "",
    startProjectYear: "",
    endProjectMonth: "",
    endProjectYear: "",
    projectDescription: ""
}], action) => {
    switch (action.type) {
        case "ADD_PROJECTS":
            return [...action.payload];
        case "DELETE_PROJECTS":
            return [...action.payload];
        case "UPDATE_PROJECTS":
            return [...action.payload];

        default:
            return state;
    }
}