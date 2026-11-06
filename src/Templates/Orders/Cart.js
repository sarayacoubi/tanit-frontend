import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../Redux/Actions/CartActions";

import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer les articles du panier
  const cartItems = useSelector((state) => state.CartReducer.cartItems);

  // Calculer le nombre total d'articles
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Calculer le montant total
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );

  // Modifier la quantité
  const handleQuantity = (productId, quantity) => {
    dispatch(updateQuantity(productId, quantity));
  };

  // Supprimer un produit
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Vider le panier
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Format du prix en dinars tunisiens
  const formatPrice = (price) => `${Number(price).toFixed(3)} DT`;

  return (
    <div className="cart-page">
      {/* En-tête */}
      <div className="cart-header">
        <h1>Mon panier</h1>
        <p>Retrouvez vos créations artisanales préférées.</p>
      </div>

      {cartItems.length === 0 ? (
        /* Panier vide */
        <div className="empty-cart">
          <i className="ri-shopping-cart-line"></i>
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos créations artisanales.</p>
          <a href="/Products" className="continue-shopping">
            Découvrir les produits
          </a>
        </div>
      ) : (
        <div className="cart-container">
          {/* Liste des produits */}
          <div className="cart-items-section">
            <div className="cart-section-header">
              <h2>Articles du panier</h2>
              <span>{totalQuantity} article(s)</span>

              <button className="clear-cart-btn" onClick={handleClearCart}>
                Vider le panier
              </button>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => {
                const product = item.product;

                const imageUrl = product.images?.[0]
                  ? product.images[0].startsWith("http")
                    ? product.images[0]
                    : `http://localhost:5000${product.images[0]}`
                  : null;

                return (
                  <div className="cart-item" key={product._id}>
                    {/* Image */}
                    <div className="cart-item-image">
                      {imageUrl ? (
                        <img src={imageUrl} alt={product.name} />
                      ) : (
                        <i className="ri-image-line"></i>
                      )}
                    </div>

                    {/* Informations produit */}
                    <div className="cart-item-info">
                      <h3>{product.name}</h3>

                      <p>{product.category?.name || "Artisanat"}</p>

                      <span className="cart-item-price">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            handleQuantity(product._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          disabled={
                            product.stock != null &&
                            item.quantity >= product.stock
                          }
                          onClick={() =>
                            handleQuantity(product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() => handleRemove(product._id)}
                      >
                        <i className="ri-delete-bin-line"></i>
                        Supprimer
                      </button>
                    </div>

                    {/* Sous-total du produit */}
                    <div className="cart-item-subtotal">
                      {formatPrice(product.price * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="cart-summary">
            <h2>Récapitulatif</h2>

            <div className="summary-row">
              <span>Articles</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="summary-row">
              <span>Sous-total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="summary-row">
              <span>Livraison</span>
              <span>À calculer</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <button
              className="back-products-btn"
              onClick={() => navigate("/Products")}
            >
              <i className="ri-arrow-left-line"></i>
              Continuer mes achats
            </button>

            <button
              className="checkout-btn"
              onClick={() => navigate("/ConfirmOrder")}
            >
              Passer la commande
            </button>

            <p className="cart-security">
              Paiement sécurisé et créations artisanales authentiques.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
