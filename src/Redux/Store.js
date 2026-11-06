import saveCartToLocalStorage from "./CartStorage";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducers";
import { thunk } from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

// Sauvegarde du panier
saveCartToLocalStorage(store);

export default store;
