import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyOrders } from "../../Redux/Actions/OrdersActions";

import "./myorder.css";

const MyOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.OrdersReducer.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return `${Number(price).toFixed(3)} DT`;
  };

  const getStatusLabel = (status) => {
    const statuses = {
      pending: "En attente",
      confirmed: "Confirmée",
      processing: "En préparation",
      shipped: "Expédiée",
      delivered: "Livrée",
      cancelled: "Annulée",
    };

    return statuses[status] || status;
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="my-orders-container">
        <div className="my-orders-empty">
          <i className="fa-solid fa-box-open"></i>
          <h2>Vous n'avez pas encore de commandes</h2>
          <p>
            Découvrez nos créations artisanales et passez votre première
            commande.
          </p>
          <a href="/Products" className="my-orders-shop-btn">
            Découvrir nos produits
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <div className="my-orders-header">
        <h1>Mes commandes</h1>
        <p>Retrouvez ici l'historique et le suivi de vos commandes.</p>
      </div>

      <div className="my-orders-list">
        {orders.map((order) => (
          <div className="my-order-card" key={order._id}>
            {/* Header de la commande */}
            <div className="my-order-header">
              <div>
                <span className="my-order-label">Commande</span>
                <h3>#{order._id.slice(-8).toUpperCase()}</h3>
              </div>

              <span className={`my-order-status status-${order.orderStatus}`}>
                {getStatusLabel(order.orderStatus)}
              </span>
            </div>

            {/* Informations */}
            <div className="my-order-info">
              <div>
                <span>Date de commande</span>
                <strong>{formatDate(order.createdAt)}</strong>
              </div>

              <div>
                <span>Nombre de produits</span>
                <strong>
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}
                </strong>
              </div>

              <div>
                <span>Total</span>
                <strong className="my-order-price">
                  {formatPrice(order.totalPrice)}
                </strong>
              </div>
            </div>

            {/* Produits commandés */}
            <div className="my-order-products">
              {order.items.map((item, index) => (
                <div
                  className="my-order-product"
                  key={item.product?._id || index}
                >
                  <div className="my-order-product-details">
                    <h4>{item.name}</h4>
                    <p>Quantité : {item.quantity}</p>
                  </div>

                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Livraison */}
            <div className="my-order-delivery">
              <i className="fa-solid fa-truck"></i>
              <span>Livraison à : {order.shippingAddress?.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
