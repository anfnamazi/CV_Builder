export const researchesReducer = (state = [{
    researchType: "",
    researchTitle: "",
    articleType: "",
    publisher: "",
    researchHyperlink: "",
    researchMonth: "",
    researchYear: "",
    researchDescription: ""
}], action) => {
    switch (action.type) {
        case "ADD_RESEARCHES":
            return [...action.payload];
        case "DELETE_RESEARCHES":
            return [...action.payload];
        case "UPDATE_RESEARCHES":
            return [...action.payload];

        default:
            return state;
    }
}