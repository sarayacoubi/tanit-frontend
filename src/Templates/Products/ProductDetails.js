import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getOneProduct } from "../../Redux/Actions/ProductsActions";
import { addToCart } from "../../Redux/Actions/CartActions";

import Loading from "../Feedback/Loading";
import "./ProductDetails.css";

const ProductDetail = ({ mode = "shop" }) => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.ProductsReducer.product);

  const isDashboard = mode === "dashboard";
  const isAvailable =
    Number(product?.stock) > 0 && product?.isAvailable === true;

  // Récupérer le produit
  useEffect(() => {
    setLoading(true);
    setAddedToCart(false);

    dispatch(getOneProduct(id))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch, id]);

  // Réinitialiser l'image sélectionnée
  useEffect(() => {
    setSelectedImage(0);
  }, [id]);

  const images = product?.images || [];

  // Ajouter le produit au panier
  const handleAddToCart = () => {
    if (!product?._id || !isAvailable) return;

    dispatch(addToCart(product, 1));

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // Chargement
  if (loading) {
    return <Loading message="Chargement du produit..." />;
  }

  // Produit introuvable
  if (!product?._id) {
    return (
      <div className="productNotFound">
        <i className="ri-shopping-bag-line"></i>

        <h2>Produit introuvable</h2>

        <p>Ce produit n'existe pas ou n'est plus disponible.</p>

        <button
          type="button"
          onClick={() =>
            navigate(isDashboard ? "/Dashboard/Products" : "/Products")
          }
        >
          Retour
        </button>
      </div>
    );
  }

  const apiURL = process.env.REACT_APP_API_URL;

  return (
    <div className={`productDetailContainer ${mode}`}>
      {/* =================================
          PRODUCT GALLERY
      ================================= */}

      <div className="productDetailGallery">
        <div className="productDetailImage">
          <img
            src={
              images[selectedImage]
                ? `${apiURL}/${images[selectedImage]}`
                : "/images/product.jpg"
            }
            alt={product.name || "Produit artisanal"}
          />

          {product.discount > 0 && (
            <span className="productDetailImageBadge">
              -{product.discount}%
            </span>
          )}
        </div>

        {images.length > 1 && (
          <div className="productThumbnails">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`productThumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={`http://localhost:5000${image}`}
                  alt={`${product.name} - vue ${index + 1}`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =================================
          PRODUCT INFORMATION
      ================================= */}

      <div className="productDetailInfo">
        <p className="productDetailCategory">
          <i className="ri-price-tag-3-line"></i>
          {product.category?.name || "Artisanat"}
        </p>

        <h1>{product.name}</h1>

        <p className="productDetailPrice">
          {product.price} <span>DT</span>
        </p>

        <p className="productDetailDescription">
          {product.description || "Aucune description disponible."}
        </p>

        {/* Artisan */}

        <div className="productDetailArtisan">
          <div className="artisanIcon">
            <i className="ri-user-3-line"></i>
          </div>

          <div>
            <span>Créé par</span>
            <p>{product.artisan?.name || "Artisan non renseigné"}</p>
          </div>
        </div>

        {/* =================================
            SPECIFICATIONS
        ================================= */}

        <div className="productDetailSpecifications">
          <h3>Caractéristiques du produit</h3>

          <div className="productSpecificationItem">
            <span>
              <i className="ri-hammer-line"></i>
              Matériaux
            </span>

            <strong>
              {product.materials?.length
                ? product.materials.join(", ")
                : "Non précisés"}
            </strong>
          </div>

          <div className="productSpecificationItem">
            <span>
              <i className="ri-palette-line"></i>
              Couleurs
            </span>

            <strong>
              {product.colors?.length
                ? product.colors.join(", ")
                : "Non précisées"}
            </strong>
          </div>

          <div className="productSpecificationItem">
            <span>
              <i className="ri-ruler-line"></i>
              Dimensions
            </span>

            <strong>
              {product.dimensions
                ? `${product.dimensions.length || 0} × ${
                    product.dimensions.width || 0
                  } × ${product.dimensions.height || 0} ${
                    product.dimensions.unit || "cm"
                  }`
                : "Non précisées"}
            </strong>
          </div>
        </div>

        {/* =================================
            DASHBOARD INFORMATION
        ================================= */}

        {isDashboard && (
          <div className="productDashboardInfo">
            <h3>Informations de gestion</h3>

            <div className="dashboardProductRow">
              <span>Stock disponible</span>
              <strong>{product.stock ?? 0} unité(s)</strong>
            </div>

            <div className="dashboardProductRow">
              <span>Réduction</span>
              <strong>{product.discount || 0}%</strong>
            </div>

            <div className="dashboardProductRow">
              <span>Disponibilité</span>

              <strong
                className={
                  product.isAvailable ? "statusActive" : "statusInactive"
                }
              >
                {product.isAvailable ? "Disponible" : "Indisponible"}
              </strong>
            </div>

            <div className="dashboardProductRow">
              <span>Statut</span>
              <strong>{product.status || "Non défini"}</strong>
            </div>

            <button
              type="button"
              onClick={() => navigate("/Dashboard/Products")}
              className="productDetailBack"
            >
              <i className="ri-arrow-left-line"></i>
              Retour aux produits
            </button>
          </div>
        )}

        {/* =================================
            SHOP ACTIONS
        ================================= */}

        {!isDashboard && (
          <div className="productShopActions">
            <div
              className={`productStockStatus ${
                isAvailable ? "available" : "unavailable"
              }`}
            >
              <span className="stockIndicator"></span>

              {isAvailable
                ? "Disponible en stock"
                : "Actuellement indisponible"}
            </div>

            <div className="productShopButtons">
              {/* Ajouter au panier */}

              <button
                type="button"
                onClick={handleAddToCart}
                className="productOrderButton"
                disabled={!isAvailable}
              >
                <i
                  className={
                    addedToCart ? "ri-check-line" : "ri-shopping-cart-line"
                  }
                ></i>

                {!isAvailable
                  ? "Indisponible"
                  : addedToCart
                    ? "Ajouté au panier !"
                    : "Ajouter au panier"}
              </button>

              {/* Voir le panier */}

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="productDetailBack"
              >
                <i className="ri-shopping-bag-line"></i>
                Voir mon panier
              </button>

              {/* Retour boutique */}

              <button
                type="button"
                onClick={() => navigate("/Products")}
                className="productDetailBack"
              >
                <i className="ri-arrow-left-line"></i>
                Retour à la boutique
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
