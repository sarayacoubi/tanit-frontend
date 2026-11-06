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
import { handleError } from "../Actions/ErrorsActions";
import axios from "axios";
const apiURL= process.env.REACT_APP_API_URL
export const register = (cordUser, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${apiURL}/api/user/SignUp`, cordUser);

    dispatch({
      type: REGISTER,
      payload: res.data,
    });
    navigate("/Profile");
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};

export const login = (cordUser, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${apiURL}/api/user/SingIn`, cordUser);

    dispatch({
      type: LOGIN,
      payload: res.data,
    });
    navigate("/");
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};

export const currentUser = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Usertoken"),
      },
    };

    const res = await axios.get(`${apiURL}/api/user/CurrentUser`, config);

    dispatch({
      type: CURRENTUSER,
      payload: res.data,
    });
  } catch (error) {
    // Vérifier si le token est expiré ou invalide
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch({
        type: FAIL,
        payload: "Unauthorized",
      });
    }

    // Afficher les autres erreurs
    else {
      dispatch(
        handleError(
          error.response?.data?.errors?.[0]?.msg ||
            "Une erreur est survenue lors de la récupération du profil",
        ),
      );
    }
  }
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const editoneuser = (id, formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(`${apiURL}/api/user/EditUser/${id}`, formData);

    dispatch({
      type: UPDATEONEUSER,
      payload: res.data.user,
    });
    navigate("/Dashboard/Users");
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/user/getAllUsers`);
    dispatch({
      type: GETALLUSERS,
      payload: res.data.users,
    });
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};

export const getOneUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/user/getUser/${id}`);
    dispatch({
      type: GETONEUSER,
      payload: res.data.found,
    });
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};

export const deleteOneUser = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.delete(`${apiURL}/api/user/DeleteUser/${id}`);

    dispatch({
      type: DELETEUSER,
      payload: res.data.id,
    });
    dispatch(getAllUsers());
    navigate("/Dashboard/Users");
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};

export const createProfessionalAccount = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Usertoken"),
      },
    };

    const res = await axios.post(
      `${apiURL}/api/user/CreateProfessionalAccount`,
      userData,
      config,
    );

    dispatch({
      type: CREATEPROFESSIONALACCOUNT,
      payload: res.data,
    });

    // Actualiser la liste des utilisateurs après la création
    dispatch(getAllUsers());

    return true;
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};
