import "./OrderList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../Redux/Actions/OrdersActions";
import Loading from "../Feedback/Loading";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllOrders()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const orders = useSelector((state) => state.OrdersReducer.orders);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  const formatPrice = (price) => {
    return `${Number(price).toFixed(2)} DT`;
  };

  const getStatusLabel = (status) => {
    const statuses = {
      pending: "En attente",
      confirmed: "Confirmée",
      processing: "En préparation",
      shipped: "Expédiée",
      delivered: "Livrée",
      cancelled: "Annulée",
      paid: "Payé",
      failed: "Échoué",
      refunded: "Remboursé",
    };

    return statuses[status] || status || "Inconnu";
  };

  if (loading) {
    return <Loading message="Chargement des orderes..." />;
  }

  return (
    <div className="orderList">
      <div className="orderListHeader">
        <div>
          <h2>Gestion des commandes</h2>
          <p>Consultez et gérez les commandes de votre boutique.</p>
        </div>

        <button className="addOrderBtn">Exporter les commandes</button>
      </div>

      <div className="orderListFilters">
        <input type="text" placeholder="Rechercher une commande..." />

        <select defaultValue="">
          <option value="" disabled>
            Tous les statuts
          </option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmée</option>
          <option value="processing">En préparation</option>
          <option value="shipped">Expédiée</option>
          <option value="delivered">Livrée</option>
          <option value="cancelled">Annulée</option>
        </select>
      </div>

      <div className="ordersTableContainer">
        <table className="ordersTable">
          <thead>
            <tr>
              <th>Commande</th>
              <th>Client</th>
              <th>Produits</th>
              <th>Total</th>
              <th>Paiement</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <span className="orderId">
                    #{order._id.slice(-6).toUpperCase()}
                  </span>
                </td>

                <td>
                  <div className="orderClient">
                    <strong>
                      {order.shippingAddress?.fullName || "Client"}
                    </strong>
                    <span>{order.phone}</span>
                  </div>
                </td>

                <td>
                  <div className="orderProducts">
                    {order.items?.map((item, index) => (
                      <div
                        className="orderProduct"
                        key={item.product?._id || item.product || index}
                      >
                        <span>{item.name}</span>
                        <small>x {item.quantity}</small>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="orderTotal">{formatPrice(order.totalPrice)}</td>

                <td>
                  <span className={`orderBadge payment-${order.paymentStatus}`}>
                    {getStatusLabel(order.paymentStatus)}
                  </span>
                </td>

                <td>
                  <span className={`orderBadge status-${order.orderStatus}`}>
                    {getStatusLabel(order.orderStatus)}
                  </span>
                </td>

                <td>{order.createdAt ? formatDate(order.createdAt) : "—"}</td>

                <td>
                  <div className="orderActions">
                    {/* Voir la commande */}
                    <i
                      className="ri-eye-line viewBtn"
                      title="Voir la commande"
                      onClick={() =>
                        navigate(`/Dashboard/getOrder/${order._id}`)
                      }
                    ></i>

                    {/* Modifier la commande */}
                    <i
                      className="ri-edit-line editBtn"
                      title="Modifier la commande"
                      onClick={() =>
                        navigate(`/Dashboard/getOrder/${order._id}`)
                      }
                    ></i>

                    {/* Supprimer la commande */}
                    <i
                      className="ri-delete-bin-line deleteBtn"
                      title="Supprimer la commande"
                      onClick={() => console.log(order._id)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
