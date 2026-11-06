import {
  GETALLPRODUCTS,
  GETONEPRODUCT,
  ADDPRODUCT,
  EDITPRODUCT,
  DELETEPRODUCT,
} from "../ActionsTypes/ProductsTypes";

const initialState = {
  products: [],
  product: {},
  errors: [],
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLPRODUCTS:
      return { ...state, products: action.payload, errors: [] };

    case GETONEPRODUCT:
      return { ...state, product: action.payload, errors: [] };

    case ADDPRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        errors: [],
      };

    case EDITPRODUCT:
      return {
        ...state,
        products: state.products.map((prod) =>
          prod._id === action.payload._id ? action.payload : prod,
        ),
        product: action.payload,
        errors: [],
      };

    case DELETEPRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload,
        ),
        errors: [],
      };

    default:
      return state;
  }
};

export default ProductsReducer;
