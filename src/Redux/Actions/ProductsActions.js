
import {
  FAIL,
  GETALLPRODUCTS,
  GETONEPRODUCT,
  ADDPRODUCT,
  EDITPRODUCT,
  DELETEPRODUCT,
} from "../ActionsTypes/ProductsTypes";

import axios from "axios";
import { handleError } from "../Actions/ErrorsActions";

const apiURL = process.env.REACT_APP_API_URL;

// Fonction commune pour gérer les erreurs
const showError = (error, dispatch) => {
  console.error("Erreur ProductsActions :", error);

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

// GET ALL PRODUCTS
export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${apiURL}/api/product/GetAllProducts`
    );

    dispatch({
      type: GETALLPRODUCTS,
      payload: res.data.products,
    });

    return res.data.products;
  } catch (error) {
    dispatch({
      type: FAIL,
      payload: error.response?.data?.errors || error.message,
    });

    showError(error, dispatch);
    throw error;
  }
};

// GET ONE PRODUCT
export const getOneProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${apiURL}/api/product/GetOneProduct/${id}`
    );

    dispatch({
      type: GETONEPRODUCT,
      payload: res.data.found,
    });

    return res.data.found;
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};

// ADD PRODUCT
export const addProduct = (product, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/product/AddProduct`,
      product
    );

    dispatch({
      type: ADDPRODUCT,
      payload: res.data.newProduct,
    });

    navigate("/Dashboard/Products");
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};

// EDIT PRODUCT
export const editPoduct = (id, editProduct, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${apiURL}/api/product/EditOneProduct/${id}`,
      editProduct
    );

    dispatch({
      type: EDITPRODUCT,
      payload: res.data.updatedProduct,
    });

    await dispatch(getAllProducts());

    navigate("/Dashboard/Products");
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};

// DELETE PRODUCT
export const deleteProduct = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${apiURL}/api/product/DeleteOneProduct/${id}`
    );

    dispatch({
      type: DELETEPRODUCT,
      payload: res.data.deletedProduct,
    });

    await dispatch(getAllProducts());

    navigate("/Dashboard/Products");
  } catch (error) {
    showError(error, dispatch);
    throw error;
  }
};
