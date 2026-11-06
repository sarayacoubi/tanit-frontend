import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  getOneOrder,
  editOrderStatus,
} from "../../Redux/Actions/OrdersActions";

import Loading from "../Feedback/Loading";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [showStatusEditor, setShowStatusEditor] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const order = useSelector((state) => state.OrdersReducer.order);

  useEffect(() => {
    setLoading(true);

    dispatch(getOneOrder(id)).finally(() => {
      setLoading(false);
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (order?.orderStatus) {
      setNewStatus(order.orderStatus);
    }
  }, [order?.orderStatus]);

  const handleUpdateStatus = () => {
    dispatch(editOrderStatus(id, newStatus, navigate));
    setShowStatusEditor(false);
  };

  const formatPrice = (price) => `${Number(price || 0).toFixed(2)} DT`;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const orderStatusLabels = {
    pending: "En attente",
    confirmed: "Confirmée",
    processing: "En préparation",
    shipped: "Expédiée",
    delivered: "Livrée",
    cancelled: "Annulée",
  };

  const paymentStatusLabels = {
    pending: "En attente",
    paid: "Payé",
    failed: "Échoué",
    refunded: "Remboursé",
  };

  const paymentMethodLabels = {
    cash_on_delivery: "Paiement à la livraison",
    card: "Carte bancaire",
  };

  if (loading) {
    return <Loading message="Chargement de la commande..." />;
  }

  if (!order || !order._id) {
    return (
      <div className="orderDetailsNotFound">
        <i className="ri-file-list-3-line"></i>
        <h2>Commande introuvable</h2>
        <p>Cette commande n'existe pas ou n'est pas disponible.</p>

        <Link to="/Dashboard/Orders" className="backOrdersBtn">
          Retour aux commandes
        </Link>
      </div>
    );
  }

  const clientName =
    order.shippingAddress?.fullName || order.user?.name || "Client";

  const totalItems = (order.items || []).reduce(
    (total, item) => total + Number(item?.quantity || 0),
    0,
  );

  return (
    <div className="orderDetails">
      {/* En-tête */}
      <div className="orderDetailsHeader">
        <div>
          <Link to="/Dashboard/Orders" className="orderDetailsBack">
            <i className="ri-arrow-left-line"></i>
            Retour aux commandes
          </Link>

          <h2>Détails de la commande</h2>

          <p>Commande #{order._id.slice(-6).toUpperCase()}</p>
        </div>

        <div className="orderDetailsStatus">
          <span className={`detailStatus status-${order.orderStatus}`}>
            {orderStatusLabels[order.orderStatus] ||
              order.orderStatus ||
              "Inconnu"}
          </span>

          <button
            type="button"
            className="editOrderStatusBtn"
            onClick={() => setShowStatusEditor((previous) => !previous)}
          >
            <i className="ri-edit-line"></i>
            Modifier le statut
          </button>
        </div>
      </div>

      {/* Modification du statut */}
      {showStatusEditor && (
        <div className="orderStatusEditor">
          <label htmlFor="orderStatus">Nouveau statut :</label>

          <select
            id="orderStatus"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmée</option>
            <option value="processing">En préparation</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>

          <button
            type="button"
            className="saveOrderStatusBtn"
            onClick={handleUpdateStatus}
          >
            Enregistrer
          </button>

          <button
            type="button"
            className="cancelOrderStatusBtn"
            onClick={() => setShowStatusEditor(false)}
          >
            Annuler
          </button>
        </div>
      )}

      {/* Résumé */}
      <div className="orderSummaryCards">
        <div className="orderSummaryCard">
          <span className="summaryIcon blue">
            <i className="ri-calendar-line"></i>
          </span>

          <div>
            <p>Date de commande</p>
            <strong>{formatDate(order.createdAt)}</strong>
          </div>
        </div>

        <div className="orderSummaryCard">
          <span className="summaryIcon purple">
            <i className="ri-shopping-bag-3-line"></i>
          </span>

          <div>
            <p>Nombre d'articles</p>
            <strong>{totalItems}</strong>
          </div>
        </div>

        <div className="orderSummaryCard">
          <span className="summaryIcon green">
            <i className="ri-money-dollar-circle-line"></i>
          </span>

          <div>
            <p>Total de la commande</p>
            <strong>{formatPrice(order.totalPrice)}</strong>
          </div>
        </div>
      </div>

      <div className="orderDetailsGrid">
        {/* Informations client */}
        <section className="orderDetailCard">
          <div className="detailCardHeader">
            <span className="detailCardIcon">
              <i className="ri-user-3-line"></i>
            </span>

            <div>
              <h3>Informations du client</h3>
              <p>Coordonnées du destinataire</p>
            </div>
          </div>

          <div className="clientProfile">
            <div className="clientAvatar">
              {clientName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{clientName}</strong>
              <span>Client</span>
            </div>
          </div>

          <div className="detailInfoList">
            <div className="detailInfoRow">
              <span>
                <i className="ri-phone-line"></i>
                Téléphone
              </span>
              <strong>{order.phone || "Non renseigné"}</strong>
            </div>

            <div className="detailInfoRow">
              <span>
                <i className="ri-mail-line"></i>
                Email
              </span>
              <strong>{order.user?.email || "Non renseigné"}</strong>
            </div>

            <div className="detailInfoRow">
              <span>
                <i className="ri-map-pin-line"></i>
                Adresse
              </span>
              <strong>
                {order.shippingAddress?.address || "Non renseignée"}
              </strong>
            </div>

            <div className="detailInfoRow">
              <span>
                <i className="ri-building-line"></i>
                Ville
              </span>
              <strong>{order.shippingAddress?.city || "Non renseignée"}</strong>
            </div>

            <div className="detailInfoRow">
              <span>
                <i className="ri-mailbox-line"></i>
                Code postal
              </span>
              <strong>
                {order.shippingAddress?.postalCode || "Non renseigné"}
              </strong>
            </div>
          </div>
        </section>

        {/* Paiement et livraison */}
        <section className="orderDetailCard">
          <div className="detailCardHeader">
            <span className="detailCardIcon">
              <i className="ri-secure-payment-line"></i>
            </span>

            <div>
              <h3>Paiement et livraison</h3>
              <p>État du règlement et de la commande</p>
            </div>
          </div>

          <div className="detailInfoList">
            <div className="detailInfoRow">
              <span>Méthode de paiement</span>
              <strong>
                {paymentMethodLabels[order.paymentMethod] ||
                  order.paymentMethod ||
                  "Non renseignée"}
              </strong>
            </div>

            <div className="detailInfoRow">
              <span>Statut du paiement</span>
              <span className={`detailStatus payment-${order.paymentStatus}`}>
                {paymentStatusLabels[order.paymentStatus] ||
                  order.paymentStatus ||
                  "Inconnu"}
              </span>
            </div>

            <div className="detailInfoRow">
              <span>Statut de livraison</span>
              <span className={`detailStatus status-${order.orderStatus}`}>
                {orderStatusLabels[order.orderStatus] ||
                  order.orderStatus ||
                  "Inconnu"}
              </span>
            </div>

            <div className="detailInfoRow">
              <span>Date de création</span>
              <strong>{formatDate(order.createdAt)}</strong>
            </div>

            <div className="detailInfoRow">
              <span>Dernière modification</span>
              <strong>{formatDate(order.updatedAt)}</strong>
            </div>
          </div>
        </section>

        {/* Produits commandés */}
        <section className="orderDetailCard orderItemsCard">
          <div className="detailCardHeader">
            <span className="detailCardIcon">
              <i className="ri-shopping-basket-2-line"></i>
            </span>

            <div>
              <h3>Produits commandés</h3>
              <p>{totalItems} article(s) dans cette commande</p>
            </div>
          </div>

          <div className="orderItemsList">
            {(order.items || []).map((item, index) => {
              if (!item) return null;

              const product = item.product;

              // Image du produit avec image de secours
              const productImage = product?.mainImage || item.image || null;

              const imageUrl = productImage
                ? productImage.startsWith("http")
                  ? productImage
                  : `http://localhost:5000${
                      productImage.startsWith("/")
                        ? productImage
                        : `/uploads/products/${productImage}`
                    }`
                : null;

              const unitPrice = Number(item.price || 0);
              const quantity = Number(item.quantity || 0);

              return (
                <div className="orderDetailProduct" key={product?._id || index}>
                  <div className="detailProductImage">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.name || "Produit commandé"}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="noProductImage">
                        <i className="ri-image-line"></i>
                      </div>
                    )}
                  </div>

                  <div className="detailProductInfo">
                    <h4>{item.name || product?.name || "Produit sans nom"}</h4>

                    {!product && (
                      <small>Produit supprimé ou indisponible</small>
                    )}

                    <span>Prix unitaire : {formatPrice(unitPrice)}</span>

                    <span>Quantité : {quantity}</span>
                  </div>

                  <div className="detailProductTotal">
                    <span>Sous-total</span>
                    <strong>{formatPrice(unitPrice * quantity)}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Récapitulatif financier */}
          <div className="orderPriceSummary">
            <div>
              <span>Nombre total d'articles</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="finalOrderTotal">
              <span>Total de la commande</span>
              <strong>{formatPrice(order.totalPrice)}</strong>
            </div>
          </div>
        </section>

        {/* Identifiants techniques */}
        <section className="orderDetailCard orderTechnicalCard">
          <div className="detailCardHeader">
            <span className="detailCardIcon">
              <i className="ri-information-line"></i>
            </span>

            <div>
              <h3>Informations complémentaires</h3>
              <p>Références internes</p>
            </div>
          </div>

          <div className="detailInfoList">
            <div className="detailInfoRow">
              <span>Identifiant de la commande</span>
              <strong className="technicalId">{order._id}</strong>
            </div>

            <div className="detailInfoRow">
              <span>Identifiant du client</span>
              <strong className="technicalId">
                {order.user?._id || order.user || "Non disponible"}
              </strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderDetails;
