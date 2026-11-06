import {
  ADDTOCART,
  REMOVEFROMCART,
  UPDATEQUANTITY,
  CLEARCART,
} from "../ActionsTypes/CartTypes";

export const addToCart = (product, quantity = 1) => {
  return {
    type: ADDTOCART,
    payload: { product, quantity },
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVEFROMCART,
    payload: productId,
  };
};

export const updateQuantity = (productId, quantity) => {
  return {
    type: UPDATEQUANTITY,
    payload: { productId, quantity },
  };
};

export const clearCart = () => {
  return {
    type: CLEARCART,
  };
};
