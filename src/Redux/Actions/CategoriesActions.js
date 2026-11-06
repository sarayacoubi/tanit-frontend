import axios from "axios";

import {
  GETALLCATEGORIES,
  GETONECATEGORY,
  EDITONECATEGORY,
  ADDCATEGORY,
  DELETEONECATEGORY,
} from "../ActionsTypes/CategoriesTypes";

import { handleError } from "../Actions/ErrorsActions";

const apiURL = process.env.REACT_APP_API_URL;

// =====================================
// GESTION COMMUNE DES ERREURS
// =====================================

const showError = (error, dispatch) => {
  console.error("Erreur CategoriesActions :", error);

  if (error.response?.data?.errors?.length > 0) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  } else if (error.response?.data?.msg) {
    dispatch(handleError(error.response.data.msg));
  } else if (error.message) {
    dispatch(handleError(error.message));
  } else {
    dispatch(handleError("Une erreur est survenue."));
  }
};

// =====================================
// GET ALL CATEGORIES
// =====================================

export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/category/GetAllCategories`);

    dispatch({
      type: GETALLCATEGORIES,
      payload: res.data.categories,
    });

    return res.data.categories;
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};

// =====================================
// GET ONE CATEGORY
// =====================================

export const getOneCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/category/GetOneCategory/${id}`);

    dispatch({
      type: GETONECATEGORY,
      payload: res.data.category,
    });

    return res.data.category;
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};

// =====================================
// EDIT CATEGORY
// =====================================

export const editCategory = (id, formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${apiURL}/api/category/EditOneCategory/${id}`,
      formData,
    );

    dispatch({
      type: EDITONECATEGORY,
      payload: res.data.category,
    });

    await dispatch(getAllCategories());

    navigate("/Dashboard/Categories");
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};

// =====================================
// ADD CATEGORY
// =====================================

export const addCategory = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/category/AddCategory`,
      formData,
    );

    dispatch({
      type: ADDCATEGORY,
      payload: res.data.newCategory,
    });

    await dispatch(getAllCategories());

    navigate("/Dashboard/Categories");
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};

// =====================================
// DELETE CATEGORY
// =====================================

export const deleteOneCategory = (id, navigate) => async (dispatch) => {
  try {
    await axios.delete(`${apiURL}/api/category/DeleteOneCategory/${id}`);

    dispatch({
      type: DELETEONECATEGORY,
      payload: id,
    });

    await dispatch(getAllCategories());

    navigate("/Dashboard/Categories");
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};
