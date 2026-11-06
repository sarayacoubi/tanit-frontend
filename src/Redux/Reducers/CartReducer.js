
import {
  ADDTOCART,
  REMOVEFROMCART,
  CLEARCART,
  UPDATEQUANTITY,
} from "../ActionsTypes/CartTypes";

// Charger le panier depuis localStorage
const getSavedCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Erreur lors du chargement du panier:", error);
    return [];
  }
};

const initialState = {
  cartItems: getSavedCart(),
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADDTOCART: {
      const { product, quantity = 1 } = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item.product._id === product._id
      );

      if (existingProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product._id === product._id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + quantity,
                    product.stock
                  ),
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            product,
            quantity: Math.min(quantity, product.stock),
          },
        ],
      };
    }

    case REMOVEFROMCART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product._id !== action.payload
        ),
      };

    case UPDATEQUANTITY: {
      const { productId, quantity } = action.payload;

      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.product._id === productId
              ? {
                  ...item,
                  quantity: Math.min(quantity, item.product.stock),
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case CLEARCART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default CartReducer;
