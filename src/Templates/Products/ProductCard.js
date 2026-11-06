import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { deleteProduct } from "../../Redux/Actions/ProductsActions";
import { addToCart } from "../../Redux/Actions/CartActions";

import ConfirmDelete from "../Feedback/ConfirmDelete";

import "./Product.css";

const ProductCard = ({ products, mode = "dashboard" }) => {
  const dispatch = useDispatch();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isDashboard = mode === "dashboard";

  const imageToDisplay = products.mainImage || products.images?.[0];

  const isAvailable =
    Number(products.stock) > 0 && products.isAvailable === true;

  // Ajouter ou retirer des favoris
  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  // Supprimer un produit
  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProductId) return;

    dispatch(deleteProduct(selectedProductId));

    setShowDeleteConfirm(false);
    setSelectedProductId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedProductId(null);
  };

  // Ajouter un produit au panier
  const handleAddToCart = () => {
    if (!products?._id || !isAvailable) return;

    dispatch(addToCart(products, 1));

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <>
      <article className={`productCard ${mode}`}>
        {/* IMAGE */}
        <div className="productCardImage">
          <img
            src={
              imageToDisplay
                ? `http://localhost:5000${imageToDisplay}`
                : "/images/product.jpg"
            }
            alt={products.name}
          />

          {/* FAVORITES */}
          {!isDashboard && (
            <button
              type="button"
              className={`productFavoriteButton ${isFavorite ? "active" : ""}`}
              onClick={handleFavorite}
              aria-label={
                isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
              }
            >
              <i className={isFavorite ? "ri-heart-fill" : "ri-heart-line"}></i>
            </button>
          )}

          {/* BADGE */}
          <span className="productCardBadge">
            {isDashboard ? products.status || "Artisanal" : "Artisanal"}
          </span>
        </div>

        {/* PRODUCT CONTENT */}
        <div className="productCardContent">
          {/* CATEGORY */}
          <p className="productCardCategory">
            {products.category?.name || "Artisanat"}
          </p>

          {/* PRODUCT NAME + PRICE */}
          <div className="productCardTitlePrice">
            <h3 className="productCardName">{products.name}</h3>

            <strong className="productCardPrice">{products.price} TND</strong>
          </div>

          {/* PRODUCT INFORMATION */}
          {isDashboard && (
            <div className="productCardInfo">
              <div>
                <span>Stock</span>
                <strong>{products.stock ?? 0}</strong>
              </div>
            </div>
          )}

          {/* DASHBOARD ACTIONS */}
          {isDashboard ? (
            <div className="productCardActions">
              <NavLink
                className="productViewButton"
                to={`/Dashboard/getProduct/${products._id}`}
                title="Consulter le produit"
              >
                <i className="ri-eye-line"></i>
                Voir
              </NavLink>

              <NavLink
                className="productEditButton"
                to={`/Dashboard/editProduct/${products._id}`}
                title="Modifier le produit"
              >
                <i className="ri-edit-line"></i>
                Modifier
              </NavLink>

              <button
                className="productDeleteButton"
                type="button"
                onClick={() => handleDeleteClick(products._id)}
                title="Supprimer le produit"
              >
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
          ) : (
            /* SHOP ACTIONS */
            <div className="productCardActions">
              <NavLink
                className="productViewButton shopViewButton"
                to={`/getProduct/${products._id}`}
              >
                Découvrir
                <i className="ri-arrow-right-line"></i>
              </NavLink>

              <button
                className="productOrderButton"
                type="button"
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                <i
                  className={
                    addedToCart ? "ri-check-line" : "ri-shopping-cart-line"
                  }
                ></i>

                {!isAvailable ? "Épuisé" : addedToCart ? "Ajouté !" : "Ajouter"}
              </button>
            </div>
          )}
        </div>
      </article>

      {/* DELETE CONFIRMATION */}
      {isDashboard && (
        <ConfirmDelete
          isOpen={showDeleteConfirm}
          title="Supprimer ce produit ?"
          message="Ce produit sera supprimé. Cette action est irréversible."
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default ProductCard;
