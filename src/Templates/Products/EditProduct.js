import "./EditProduct.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getOneProduct, editPoduct } from "../../Redux/Actions/ProductsActions";

import { getAllCategories } from "../../Redux/Actions/CategoriesActions";
import { getAllUsers } from "../../Redux/Actions/UsersActions";

import Loading from "../Feedback/Loading";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Récupération des données Redux
  const product = useSelector((state) => state.ProductsReducer.product);

  const categories = useSelector((state) => state.CategoriesReducer.categories);

  const users = useSelector((state) => state.UsersReducer.users);

  // Récupération des artisans
  const artisans = Array.isArray(users)
    ? users.filter((user) => user.role === "artisan")
    : [];

  // États
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");
  const [artisan, setArtisan] = useState("");

  const [materials, setMaterials] = useState([]);
  const [materialInput, setMaterialInput] = useState("");

  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");

  // Nouvelles images uniquement
  const [images, setImages] = useState([]);

  // Photo principale
  const [mainImage, setMainImage] = useState("");

  const [dimensions, setDimensions] = useState({
    length: 0,
    width: 0,
    height: 0,
    unit: "cm",
  });

  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");

  const [origin, setOrigin] = useState("");
  const [stock, setStock] = useState("");

  const [isAvailable, setIsAvailable] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState("active");

  // =========================================
  // CHARGER LES DONNÉES
  // =========================================

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        await dispatch(getOneProduct(id));
      } catch (error) {
        console.error("Erreur chargement produit :", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

    dispatch(getAllCategories());
    dispatch(getAllUsers());
  }, [dispatch, id]);

  // =========================================
  // REMPLIR LE FORMULAIRE
  // =========================================

  useEffect(() => {
    if (!product || product._id !== id) return;

    setName(product.name || "");
    setDescription(product.description || "");
    setPrice(product.price ?? "");

    setCategory(product.category?._id || product.category || "");

    setArtisan(product.artisan?._id || product.artisan || "");

    setMaterials(Array.isArray(product.materials) ? product.materials : []);

    setColors(Array.isArray(product.colors) ? product.colors : []);

    setDimensions({
      length: product.dimensions?.length ?? 0,
      width: product.dimensions?.width ?? 0,
      height: product.dimensions?.height ?? 0,
      unit: product.dimensions?.unit || "cm",
    });

    setWeight(product.weight ?? "");
    setWeightUnit(product.weightUnit || "kg");

    setOrigin(product.origin || "");
    setStock(product.stock ?? "");

    setIsAvailable(product.isAvailable ?? true);
    setDiscount(product.discount ?? 0);

    setStatus(product.status || "active");

    setMainImage(product.mainImage || product.images?.[0] || "");

    // Les anciennes images restent dans product.images.
    // images contient uniquement les nouveaux fichiers.
    setImages([]);
  }, [product, id]);

  // =========================================
  // MODIFIER LES DIMENSIONS
  // =========================================

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;

    setDimensions((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================
  // AJOUTER UN MATÉRIAU
  // =========================================

  const handleAddMaterial = () => {
    const value = materialInput.trim();

    if (value && !materials.includes(value)) {
      setMaterials((previous) => [...previous, value]);
      setMaterialInput("");
    }
  };

  const handleRemoveMaterial = (materialToRemove) => {
    setMaterials((previous) =>
      previous.filter((material) => material !== materialToRemove),
    );
  };

  // =========================================
  // AJOUTER UNE COULEUR
  // =========================================

  const handleAddColor = () => {
    const value = colorInput.trim();

    if (value && !colors.includes(value)) {
      setColors((previous) => [...previous, value]);
      setColorInput("");
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setColors((previous) =>
      previous.filter((color) => color !== colorToRemove),
    );
  };

  // =========================================
  // SÉLECTIONNER LES IMAGES
  // =========================================

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  // =========================================
  // MODIFIER LE PRODUIT
  // =========================================

  const handleEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price));

    formData.append("category", category);
    formData.append("artisan", artisan);

    // Ajouter les nouvelles images
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Matériaux et couleurs
    formData.append("materials", JSON.stringify(materials));

    formData.append("colors", JSON.stringify(colors));

    // Dimensions
    formData.append(
      "dimensions",
      JSON.stringify({
        length: Number(dimensions.length),
        width: Number(dimensions.width),
        height: Number(dimensions.height),
        unit: dimensions.unit,
      }),
    );

    // Poids
    formData.append("weight", Number(weight || 0));
    formData.append("weightUnit", weightUnit);

    // Autres informations
    formData.append("origin", origin);
    formData.append("stock", Number(stock));

    formData.append("isAvailable", String(isAvailable));

    formData.append("discount", Number(discount || 0));

    formData.append("status", status);
    formData.append("mainImage", mainImage);

    dispatch(editPoduct(id, formData, navigate));
  };

  // =========================================
  // CHARGEMENT
  // =========================================

  if (loading) {
    return <Loading message="Chargement du produit..." />;
  }

  if (!product || product._id !== id) {
    return (
      <div className="editProductContainer">
        <p>Produit introuvable.</p>
        <button type="button" onClick={() => navigate("/Dashboard/Products")}>
          Retour aux produits
        </button>
      </div>
    );
  }

  // =========================================
  // AFFICHAGE
  // =========================================

  return (
    <div className="editProductContainer">
      <h2>Modifier le produit</h2>

      <form className="editProductForm" onSubmit={handleEdit}>
        {/* NOM */}

        <div className="formGroup">
          <label htmlFor="name">Nom du produit</label>

          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* DESCRIPTION */}

        <div className="formGroup">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* PRIX */}

        <div className="formGroup">
          <label htmlFor="price">Prix (TND)</label>

          <input
            type="number"
            id="price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* CATÉGORIE */}

        <div className="formGroup">
          <label htmlFor="category">Catégorie</label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Choisir une catégorie</option>

            {Array.isArray(categories) &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* ARTISAN */}

        <div className="formGroup">
          <label htmlFor="artisan">Artisan</label>

          <select
            id="artisan"
            value={artisan}
            onChange={(e) => setArtisan(e.target.value)}
            required
          >
            <option value="">Choisir un artisan</option>

            {artisans.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* MATÉRIAUX */}

        <div className="formGroup">
          <label>Matériaux</label>

          <div className="inputWithButton">
            <input
              type="text"
              value={materialInput}
              onChange={(e) => setMaterialInput(e.target.value)}
              placeholder="Exemple : bois"
            />

            <button type="button" onClick={handleAddMaterial}>
              Ajouter
            </button>
          </div>

          <div className="tagsList">
            {materials.map((material, index) => (
              <span className="tag" key={`${material}-${index}`}>
                {material}

                <button
                  type="button"
                  onClick={() => handleRemoveMaterial(material)}
                  aria-label={`Supprimer ${material}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* COULEURS */}

        <div className="formGroup">
          <label>Couleurs</label>

          <div className="inputWithButton">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Exemple : rouge"
            />

            <button type="button" onClick={handleAddColor}>
              Ajouter
            </button>
          </div>

          <div className="tagsList">
            {colors.map((color, index) => (
              <span className="tag" key={`${color}-${index}`}>
                {color}

                <button
                  type="button"
                  onClick={() => handleRemoveColor(color)}
                  aria-label={`Supprimer ${color}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* DIMENSIONS */}

        <div className="dimensionsGroup">
          <h4>Dimensions du produit</h4>

          <div className="dimensionsInputs">
            <div className="formGroup">
              <label htmlFor="length">Longueur</label>

              <input
                type="number"
                id="length"
                name="length"
                min="0"
                value={dimensions.length}
                onChange={handleDimensionChange}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="width">Largeur</label>

              <input
                type="number"
                id="width"
                name="width"
                min="0"
                value={dimensions.width}
                onChange={handleDimensionChange}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="height">Hauteur</label>

              <input
                type="number"
                id="height"
                name="height"
                min="0"
                value={dimensions.height}
                onChange={handleDimensionChange}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="dimensionUnit">Unité</label>

              <select
                id="dimensionUnit"
                name="unit"
                value={dimensions.unit}
                onChange={handleDimensionChange}
              >
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>
        </div>

        {/* POIDS */}

        <div className="formGroup">
          <label htmlFor="weight">Poids</label>

          <input
            type="number"
            id="weight"
            min="0"
            step="0.01"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        {/* UNITÉ POIDS */}

        <div className="formGroup">
          <label htmlFor="weightUnit">Unité du poids</label>

          <select
            id="weightUnit"
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
          >
            <option value="g">g</option>
            <option value="kg">kg</option>
          </select>
        </div>

        {/* ORIGINE */}

        <div className="formGroup">
          <label htmlFor="origin">Origine</label>

          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>

        {/* STOCK */}

        <div className="formGroup">
          <label htmlFor="stock">Stock</label>

          <input
            type="number"
            id="stock"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        {/* RÉDUCTION */}

        <div className="formGroup">
          <label htmlFor="discount">Réduction (%)</label>

          <input
            type="number"
            id="discount"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {/* STATUT */}

        <div className="formGroup">
          <label htmlFor="status">Statut</label>

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {/* Conserver le statut actuel s'il ne figure pas
                parmi les options ci-dessous. */}
            {!["active", "pending", "approved", "rejected"].includes(
              status,
            ) && <option value={status}>{status}</option>}

            <option value="active">Actif</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>

        {/* DISPONIBILITÉ */}

        <div className="formGroup">
          <label htmlFor="isAvailable">Disponibilité</label>

          <select
            id="isAvailable"
            value={String(isAvailable)}
            onChange={(e) => setIsAvailable(e.target.value === "true")}
          >
            <option value="true">Disponible</option>
            <option value="false">Indisponible</option>
          </select>
        </div>

        {/* GALERIE EXISTANTE */}

        <div className="formGroup">
          <label>Galerie des photos</label>

          <p>Cliquez sur une photo pour la définir comme photo principale.</p>

          <div className="editProductGallery">
            {product.images?.length > 0 ? (
              product.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`editProductThumbnail ${
                    mainImage === image ? "selected" : ""
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={`http://localhost:5000${image}`}
                    alt={`${product.name} - vue ${index + 1}`}
                  />

                  {mainImage === image && (
                    <span className="mainImageBadge">Photo principale ✓</span>
                  )}
                </button>
              ))
            ) : (
              <p>Aucune image existante.</p>
            )}
          </div>
        </div>

        {/* NOUVELLES IMAGES */}

        <div className="formGroup">
          <label htmlFor="images">Ajouter de nouvelles images</label>

          <input
            type="file"
            id="images"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImagesChange}
          />

          {images.length > 0 && (
            <p>{images.length} nouvelle(s) image(s) sélectionnée(s).</p>
          )}
        </div>

        {/* BOUTONS */}

        <div className="formActions">
          <button type="submit">Enregistrer les modifications</button>

          <button type="button" onClick={() => navigate("/Dashboard/Products")}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
