import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "../reducers";
import thunk from "redux-thunk";
import { loadingBarMiddleware } from "react-redux-loading-bar";

export const store = createStore(
  reducers,
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? compose(
      applyMiddleware(thunk, loadingBarMiddleware()),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : applyMiddleware(thunk)
);

// store.subscribe(() => console.log(store.getState()))
