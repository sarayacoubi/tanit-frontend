import { combineReducers } from "redux";
import UsersReducer from "./UsersReducer";
import ProductsReducer from "./ProductsReducer";
import CategoriesReducer from "./CategoriesReducer";
import ErrorsReducer from "./ErrorsReducer";
import OrdersReducer from "./OrdersReducer";
import CartReducer from "./CartReducer";

const rootReducer = combineReducers({
  UsersReducer,
  ProductsReducer,
  CategoriesReducer,
  ErrorsReducer,
  OrdersReducer,
  CartReducer,
});

export default rootReducer;
