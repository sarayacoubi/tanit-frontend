import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllCategories } from "../../../Redux/Actions/CategoriesActions";
import { getAllProducts } from "../../../Redux/Actions/ProductsActions";

import ProductsList from "../../Products/ProductsList";

import "./home.css";

const Home = () => {
  const dispatch = useDispatch();

  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Récupérer les catégories actives
  const categories = useSelector((state) =>
    (state.CategoriesReducer.categories || []).filter(
      (category) => category.isActive === true
    )
  );

  // Récupérer les produits approuvés
  const products = useSelector((state) =>
    (state.ProductsReducer.products || []).filter(
      (product) => product.status === "approved"
    )
  );

  // Les quatre premiers produits pour le carousel
  const carouselProducts = products.slice(0, 4);

  // Récupération des données depuis Redux
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  // Réinitialiser l'index si le nombre de produits change
  useEffect(() => {
    if (activeProductIndex >= carouselProducts.length) {
      setActiveProductIndex(0);
    }
  }, [activeProductIndex, carouselProducts.length]);

  // Carousel automatique
  useEffect(() => {
    if (carouselProducts.length <= 1) return;

    const interval = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % carouselProducts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [carouselProducts.length]);

  // Construire correctement l'URL de l'image
  const getProductImage = (product) => {
    if (!product) return null;

    const image = product.images?.[0] || product.mainImage || null;

    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/")) {
      return `http://localhost:5000${image}`;
    }

    return `http://localhost:5000/uploads/products/${image}`;
  };

  // Produit précédent
  const prevProduct = () => {
    setActiveProductIndex((prev) =>
      prev === 0 ? carouselProducts.length - 1 : prev - 1
    );
  };

  // Produit suivant
  const nextProduct = () => {
    setActiveProductIndex((prev) => (prev + 1) % carouselProducts.length);
  };

  // Sélectionner un produit
  const goToProduct = (index) => {
    setActiveProductIndex(index);
  };

    const apiURL = process.env.REACT_APP_API_URL;

  return (
    <main className="home">
      {/* =====================================
          HERO CAROUSEL
      ====================================== */}

      <section className="heroCarousel">
        {carouselProducts.length > 0 ? (
          <>
            {carouselProducts.map((product, index) => {
              const imageUrl = getProductImage(product);

              return (
                <div
                  className={`heroSlide ${
                    index === activeProductIndex ? "active" : ""
                  }`}
                  key={product._id}
                  aria-hidden={index !== activeProductIndex}
                >
                  {/* Conteneur image + flèches collées à droite de l'image */}
                  <div className="heroProductImageWrapper">
                    <div className="heroProductImage">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          onError={(e) => {
                            console.error("Erreur chargement image :", imageUrl);
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="heroImagePlaceholder">
                          <i className="ri-image-line"></i>
                        </div>
                      )}
                    </div>

                    {/* Flèche précédente (collée à droite de la photo) */}
                    {carouselProducts.length > 1 && (
                      <button
                        type="button"
                        className="heroArrow heroPrev"
                        onClick={prevProduct}
                        aria-label="Produit précédent"
                      >
                        <i className="ri-arrow-up-s-line"></i>
                      </button>
                    )}

                    {/* Flèche suivante (collée à droite de la photo) */}
                    {carouselProducts.length > 1 && (
                      <button
                        type="button"
                        className="heroArrow heroNext"
                        onClick={nextProduct}
                        aria-label="Produit suivant"
                      >
                        <i className="ri-arrow-down-s-line"></i>
                      </button>
                    )}
                  </div>

                  {/* Informations du produit */}
                  <div className="heroProductContent">
                    <span className="heroEyebrow">
                      <i className="ri-hand-heart-line"></i>
                      L'artisanat tunisien à l'honneur
                    </span>

                    <span className="heroProductLabel">
                      Découvrez notre sélection
                    </span>

                    <h1>{product.name}</h1>

                    <p className="heroProductDescription">
                      {product.description ||
                        "Une création artisanale unique, réalisée avec passion et savoir-faire par nos artisans tunisiens."}
                    </p>

                    <div className="heroProductPrice">
                      {product.price} <span>DT</span>
                    </div>

                    <div className="heroActions">
                      <Link
                        to={`/Products/${product._id}`}
                        className="heroButton"
                        tabIndex={index === activeProductIndex ? 0 : -1}
                      >
                        Découvrir le produit
                        <i className="ri-arrow-right-line"></i>
                      </Link>

                      <Link
                        to="/Products"
                        className="heroSecondaryButton"
                        tabIndex={index === activeProductIndex ? 0 : -1}
                      >
                        Explorer la boutique
                      </Link>
                    </div>

                    {/* Avantages */}
                    <div className="heroFeatures">
                      <div>
                        <i className="ri-hand-heart-line"></i>
                        <span>Fait main</span>
                      </div>

                      <div>
                        <i className="ri-map-pin-line"></i>
                        <span>100% tunisien</span>
                      </div>

                      <div>
                        <i className="ri-leaf-line"></i>
                        <span>Authentique</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Indicateurs */}
            <div className="heroIndicators">
              {carouselProducts.map((product, index) => (
                <button
                  type="button"
                  key={product._id}
                  className={`heroIndicator ${
                    index === activeProductIndex ? "active" : ""
                  }`}
                  onClick={() => goToProduct(index)}
                  aria-label={`Afficher le produit ${index + 1}`}
                  aria-current={
                    index === activeProductIndex ? "true" : undefined
                  }
                />
              ))}
            </div>

            {/* Compteur */}
            <span className="heroCounter">
              0{activeProductIndex + 1} / 0{carouselProducts.length}
            </span>
          </>
        ) : (
          <div className="heroEmpty">
            <span className="heroEyebrow">
              <i className="ri-hand-heart-line"></i>
              L'artisanat tunisien à l'honneur
            </span>

            <h1>L'authenticité de l'artisanat tunisien chez vous</h1>

            <p>
              Découvrez des créations artisanales uniques, réalisées avec
              passion et savoir-faire par nos artisans tunisiens.
            </p>

            <Link to="/Products" className="heroButton">
              Explorer la boutique
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        )}
      </section>

      {/* =====================================
          CATEGORIES SECTION
      ====================================== */}

      <section className="categoriesSection">
        <div className="sectionHeading">
          <span className="sectionEyebrow">Explorez notre univers</span>

          <h2>Nos catégories</h2>

          <p>
            Une sélection de créations inspirées du patrimoine et du
            savoir-faire tunisien.
          </p>
        </div>

        <div className="categoriesGrid">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                to={`/Products?category=${encodeURIComponent(category.name)}`}
                className="categoryCard"
                key={category._id}
              >
                <div className="categoryImage">
                  {category.image ? (
                    <img
                      src={
                        category.image.startsWith("http")
                          ? category.image
                          : `${apiURL}/uploads/categories/${category.image}`
                      }
                      alt={category.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="categoryImagePlaceholder">
                      <i className="ri-image-line"></i>
                    </div>
                  )}

                  <div className="categoryOverlay">
                    <span>Découvrir</span>
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>

                <div className="categoryInfo">
                  <h3>{category.name}</h3>

                  <p className="categoryDescription">
                    {category.description ||
                      "Découvrez nos créations artisanales authentiques."}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="homeEmptyMessage">
              Aucune catégorie disponible pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* =====================================
          POPULAR PRODUCTS SECTION
      ====================================== */}

      <section className="popularSection">
        <div className="sectionHeading popularHeading">
          <div>
            <span className="sectionEyebrow">Notre sélection</span>

            <h2>Nos créations populaires</h2>

            <p>
              Retrouvez une sélection de produits artisanaux choisis pour leur
              originalité et leur qualité.
            </p>
          </div>

          <Link to="/Products" className="viewAllProducts">
            Voir tous les produits
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <ProductsList
          mode="shop"
          products={products.slice(0, 4)}
          compact={true}
        />
      </section>

      {/* =====================================
          ARTISANS SECTION
      ====================================== */}

      <section className="artisanSection">
        <div className="artisanContent">
          <span className="sectionEyebrow">Derrière chaque création</span>

          <h2>Soutenons le savoir-faire de nos artisans</h2>

          <p>
            Chaque produit raconte une histoire, transmet une tradition et
            valorise le talent de nos artisans locaux. Avec Tanit, découvrez et
            encouragez la richesse de l'artisanat tunisien.
          </p>

          <Link to="/Products" className="artisanButton">
            Explorer les créations
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="artisanDecoration">
          <i className="ri-hand-heart-line"></i>

          <span>Créé avec passion</span>

          <strong>Made in Tunisia</strong>
        </div>
      </section>
    </main>
  );
};

export default Home;