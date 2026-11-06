import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addOrder } from "../../Redux/Actions/OrdersActions";
import { clearCart } from "../../Redux/Actions/CartActions";

import "./checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.CartReducer.cartItems);

  const user = useSelector((state) => state.UsersReducer.user);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.product.price *
        (1 - (item.product.discount || 0) / 100) *
        item.quantity,
    0,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      phone: formData.phone,
    };

    setLoading(true);

    try {
      // Créer la commande dans la base de données
      await dispatch(addOrder(orderData));

      // Vider le panier après confirmation
      dispatch(clearCart());

      navigate("/MyOrders");
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des produits avant de passer une commande.</p>
        <Link to="/Products" className="checkout-back-btn">
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Finaliser ma commande</h1>
        <p>Complétez vos informations pour recevoir vos créations Tanit.</p>
      </div>

      <form onSubmit={handleSubmit} className="checkout-content">
        {/* Informations de livraison */}
        <div className="checkout-form-section">
          <h2>Informations de livraison</h2>

          <div className="checkout-fields">
            <div className="checkout-field">
              <label>Nom et prénom</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Votre nom complet"
              />
            </div>

            <div className="checkout-field">
              <label>Numéro de téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Votre numéro de téléphone"
              />
            </div>

            <div className="checkout-field">
              <label>Adresse</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Votre adresse complète"
              />
            </div>

            <div className="checkout-field">
              <label>Ville</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Votre ville"
              />
            </div>

            <div className="checkout-field">
              <label>Code postal</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Code postal"
              />
            </div>
          </div>

          {/* Mode de paiement */}
          <div className="checkout-payment">
            <h2>Mode de paiement</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked
                readOnly
              />

              <span>
                <strong>Paiement à la livraison</strong>
                <small>Payez votre commande à la réception.</small>
              </span>
            </label>
          </div>
        </div>

        {/* Résumé de la commande */}
        <div className="checkout-summary">
          <h2>Résumé de la commande</h2>

          <div className="checkout-products">
            {cartItems.map((item) => {
              const product = item.product;
              const price = product.price * (1 - (product.discount || 0) / 100);

              return (
                <div className="checkout-product" key={product._id}>
                  <div>
                    <h4>{product.name}</h4>
                    <p>Quantité : {item.quantity}</p>
                  </div>

                  <span>{(price * item.quantity).toFixed(3)} DT</span>
                </div>
              );
            })}
          </div>

          <div className="checkout-total">
            <span>Total à payer</span>
            <strong>{totalPrice.toFixed(3)} DT</strong>
          </div>

          <button
            type="submit"
            className="checkout-submit-btn"
            disabled={loading}
          >
            {loading ? "Commande en cours..." : "Confirmer la commande"}
          </button>

          <Link to="/Cart" className="checkout-return">
            Retour au panier
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
