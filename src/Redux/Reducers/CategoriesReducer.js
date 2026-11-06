import {
  GETALLCATEGORIES,
  GETONECATEGORY,
  EDITONECATEGORY,
  ADDCATEGORY,
  DELETEONECATEGORY,
} from "../ActionsTypes/CategoriesTypes";

const initialState = {
  categories: [],
  category: {},
  errors: [],
};

const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCATEGORIES:
      return { ...state, categories: action.payload, errors: [] };

    case GETONECATEGORY:
      return { ...state, category: action.payload, errors: [] };

    case EDITONECATEGORY:
      return {
        ...state,
        category: action.payload,
        categories: state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat,
        ),
        errors: [],
      };

    case ADDCATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        errors: [],
      };

    case DELETEONECATEGORY:
      return {
        ...state,
        categoris: state.categories.filter(
          (category) => category._id !== action.payload,
        ),
        errors: [],
      };

    default:
      return state;
  }
};
export default CategoriesReducer;
