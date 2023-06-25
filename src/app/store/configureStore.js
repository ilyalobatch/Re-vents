// library
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

// helpers
import { verifyAuth } from "../../features/auth/authActions";
import rootReducer from "./rootReducer";

export const history = createBrowserHistory();

const configureStore = () => {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(applyMiddleware(thunk))
  );
  store.dispatch(verifyAuth());

  return store;
};

export default configureStore;
