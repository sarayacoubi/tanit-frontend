import {
  FAIL,
  REGISTER,
  LOGIN,
  CURRENTUSER,
  LOGOUT,
  UPDATEONEUSER,
  GETALLUSERS,
  GETONEUSER,
  DELETEUSER,
  CREATEPROFESSIONALACCOUNT,
} from "../ActionsTypes/UsersTypes";

const initialState = {
  users: [],
  user: {},
  selectedUser: {},
  professionalAccount: null,
  errors: [],
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      localStorage.setItem("Usertoken", action.payload.token);
      return {
        ...state,
        user: action.payload.newUser,
        errors: [],
      };

    case LOGIN:
      localStorage.setItem("Usertoken", action.payload.token);
      return {
        ...state,
        user: action.payload.found,
        errors: [],
      };

    case CURRENTUSER:
      return {
        ...state,
        user: action.payload,
        errors: [],
      };

    case UPDATEONEUSER:
      return {
        ...state,
        user: action.payload,
        errors: [],
      };

    case GETALLUSERS:
      return {
        ...state,
        users: action.payload,
        errors: [],
      };

    case GETONEUSER:
      return {
        ...state,
        selectedUser: action.payload,
        errors: [],
      };

    case DELETEUSER:
      return {
        ...state,
        users: state.users.filter(
          (selectedUser) => selectedUser._id !== action.payload,
        ),
        errors: [],
      };

    case LOGOUT:
      localStorage.removeItem("Usertoken");
      return {
        ...state,
        user: {},
        professionalAccount: null,
        errors: [],
      };

    case CREATEPROFESSIONALACCOUNT:
      return { ...state, professionalAccount: action.payload, errors: [] };
    case FAIL: {
      const errorMessage = Array.isArray(action.payload)
        ? action.payload.join(" ").toLowerCase()
        : String(action.payload || "").toLowerCase();

      const isAuthError =
        errorMessage.includes("jwt expired") ||
        errorMessage.includes("jwt malformed") ||
        errorMessage.includes("not authorized") ||
        errorMessage.includes("invalid token") ||
        errorMessage.includes("unauthorized");

      if (isAuthError) {
        localStorage.removeItem("Usertoken");

        return {
          ...state,
          user: {},
          errors: action.payload,
        };
      }

      return {
        ...state,
        errors: action.payload,
      };
    }

    default:
      return state;
  }
};

export default UsersReducer;
