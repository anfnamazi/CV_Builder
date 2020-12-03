export const honorsReducer = (state = [{
    honorTitle: "",
    honorMonth: "",
    honorYear: ""
}], action) => {
    switch (action.type) {
        case "ADD_HONORS":
            return [...action.payload];
        case "DELETE_HONORS":
            return [...action.payload];
        case "UPDATE_HONORS":
            return [...action.payload];

        default:
            return state;
    }
}