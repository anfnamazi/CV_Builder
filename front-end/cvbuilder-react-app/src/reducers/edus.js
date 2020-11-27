export const edusReducer = (state = [{
    sectionEdu: "",
    fieldEdu: "",
    orientationEdu: "",
    uniType: "",
    uniName: "",
    averageEdu: "",
    uniCountry: "",
    uniProvince: "",
    uniCity: "",
    startEdu: "",
    endEdu: "",
    stillStudying: false,
}], action) => {
    switch (action.type) {
        case "ADD_EDUS":
            return [...action.payload];
        case "DELETE_EDUS":
            return [...action.payload];
        case "UPDATE_EDUS":
            return [...action.payload];

        default:
            return state;
    }
}