const saveCartToLocalStorage = (store) => {
  store.subscribe(() => {
    const cartItems = store.getState().CartReducer.cartItems;

    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du panier :", error);
    }
  });
};

export default saveCartToLocalStorage;