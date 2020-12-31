export const honorsReducer = (state = [{
    honorTitle: "",
    honorMonth: "",
    honorYear: "",
    cert: { name: "لطفا مدرک مربوطه را بارگذاری کنید." },
    type: ""
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