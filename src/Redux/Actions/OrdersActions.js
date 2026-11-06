import axios from "axios";
import { handleError } from "../Actions/ErrorsActions";
import {
  GETALLORDERS,
  GETONEORDER,
  EDITORDERSTATUS,
  ADDORDER,
} from "../ActionsTypes/OrdersTypes";
const apiURL= process.env.REACT_APP_API_URL

export const addOrder = (orderData) => async (dispatch) => {
  try {
    const res = await axios.post(`${apiURL}/api/order/AddOrder`, orderData, {
      headers: {
        Authorization: localStorage.getItem("Usertoken"),
      },
    });

    dispatch({
      type: ADDORDER,
      payload: res.data.newOrder,
    });

    return res.data.newOrder;
  } catch (error) {
    const errors = error.response?.data?.errors || [
      { msg: "Impossible de créer la commande" },
    ];

    errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });

    throw error;
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/order/GetAllOrders`);
    dispatch({
      type: GETALLORDERS,
      payload: res.data.orders,
    });
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};

export const getOneOrder = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/order/GetOneOrder/${id}`);
    dispatch({
      type: GETONEORDER,
      payload: res.data.found,
    });
  } catch (error) {
    error.response.data.errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};
export const editOrderStatus =
  (id, orderStatus, navigate) => async (dispatch) => {
    try {
      const res = await axios.put(`${apiURL}/api/order/EditOrderStatus/${id}`, {
        orderStatus,
      });

      dispatch({
        type: EDITORDERSTATUS,
        payload: res.data.updatedOrder,
      });
      dispatch(getAllOrders());
      navigate("/Dashboard/Orders");
    } catch (error) {
      error.response.data.errors.forEach((element) => {
        dispatch(handleError(element.msg));
      });
    }
  };


  
export const getMyOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiURL}/api/order/GetMyOrders`, {
      headers: {
        Authorization: localStorage.getItem("Usertoken"),
      },
    });

    dispatch({
      type: GETALLORDERS,
      payload: res.data.orders,
    });

  } catch (error) {
    const errors = error.response?.data?.errors || [
      { msg: "Impossible de récupérer vos commandes" },
    ];

    errors.forEach((element) => {
      dispatch(handleError(element.msg));
    });
  }
};

