export const jobsReducer = (state = [{
    jobTitle: "",
    jobGroup: "",
    jobCenter: "",
    titleCenter: "",
    cooperateType: "",
    seniorLevel: "",
    jobCountry: "",
    jobProvince: "",
    jobCity: "",
    startJobMonth: "",
    startJobYear: "",
    endJobMonth: "",
    endJobYear: "",
    income: "",
    number: "",
    jobDescription: "",
    stillWorking: false,
}], action) => {
    switch (action.type) {
        case "ADD_JOBS":
            return [...action.payload];
        case "DELETE_JOBS":
            return [...action.payload];
        case "UPDATE_JOBS":
            return [...action.payload];

        default:
            return state;
    }

}