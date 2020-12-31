import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "../reducers";
import thunk from "redux-thunk";

export const store = createStore(
  reducers,
  process.env.REACT_APP_ENVIRONMENT === "development" ?
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) : applyMiddleware(thunk)
);

// store.subscribe(() => console.log(store.getState()))
