import "./Addproduct.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../Redux/Actions/CategoriesActions";
import { getAllUsers } from "../../Redux/Actions/UsersActions";
import { addProduct } from "../../Redux/Actions/ProductsActions";
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllUsers());
  }, [dispatch]);

  const categories = useSelector((state) => state.CategoriesReducer.categories);
  const artisans = useSelector((state) =>
    state.UsersReducer.users.filter((user) => user.role === "artisan"),
  );

  const [materials, setMaterials] = useState([]);
  const [materialInput, setMaterialInput] = useState("");

  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [artisan, setArtisan] = useState("");
  const [images, setImages] = useState([]);

  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
    unit: "cm",
  });
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("g");
  const [origin, setOrigin] = useState("");
  const [stock, setStock] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState("");

  const hundelSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 1. Informations générales
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("artisan", artisan);

    // 2. Images
    images.forEach((image) => {
      formData.append("images", image);
    });

    // 3. Caractéristiques artisanales
    formData.append("materials", JSON.stringify(materials));
    formData.append("colors", JSON.stringify(colors));

    // 4. Dimensions
    formData.append(
      "dimensions",
      JSON.stringify({
        length: Number(dimensions.length),
        width: Number(dimensions.width),
        height: Number(dimensions.height),
        unit: dimensions.unit,
      }),
    );

    // 5. Poids et origine
    formData.append("weight", Number(weight));
    formData.append("weightUnit", weightUnit);
    formData.append("origin", origin);

    // 6. Stock et disponibilité
    formData.append("stock", Number(stock));
    formData.append("isAvailable", isAvailable);
    formData.append("discount", Number(discount || 0));
    formData.append("status", status);

    dispatch(addProduct(formData, navigate));
  };

  return (
    <div className="addProduct">
    <div className="addProductHeader">
    <div>
      <h2>Ajouter un produit</h2>
      <p>Ajouter un nouveau produit à votre catalogue.</p>
    </div>

    <button
      type="button"
      className="backProductsBtn"
      onClick={() => navigate("/Dashboard/Products")}
    >
      <i className="ri-arrow-left-line"></i>
      Retour aux produits
    </button>
  </div>

      <form className="addProductForm" onSubmit={hundelSubmit}>
        {/* 1. Informations générales */}
        <fieldset>
          <legend>Informations générales</legend>

          <div className="formGroup">
            <label htmlFor="name">Nom du produit</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Nom du produit"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              name="description"
              value={description}
              placeholder="Description du produit"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="price">Prix (TND)</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="price"
              name="price"
              min="0"
              value={price}
              placeholder="Prix du produit"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="category">Catégorie</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              name="category"
              value={category}
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="artisan">Artisan propriétaire</label>
            <select
              onChange={(e) => setArtisan(e.target.value)}
              id="artisan"
              name="artisan"
              value={artisan}
            >
              <option value="">Choisir un artisan</option>
              {artisans.map((artisan) => (
                <option value={artisan._id} key={artisan._id}>
                  {artisan.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* 2. Images */}
        <fieldset>
          <legend>Images du produit</legend>

          <div className="formGroup">
            <label htmlFor="images">Sélectionner les images</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
          </div>
        </fieldset>

        {/* 3. Caractéristiques artisanales */}
        <fieldset>
          <legend>Caractéristiques artisanales</legend>

          <div className="formGroup">
            <label htmlFor="materials">Matériaux</label>

            <div className="materialsInput">
              <div className="materialsList">
                {materials.map((material, index) => (
                  <span className="materialTag" key={index}>
                    {material}

                    <button
                      type="button"
                      onClick={() =>
                        setMaterials(materials.filter((_, i) => i !== index))
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}

                <input
                  type="text"
                  id="materials"
                  value={materialInput}
                  placeholder="Écrire un matériau puis Entrée"
                  onChange={(e) => setMaterialInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      const material = materialInput.trim();

                      if (
                        material !== "" &&
                        !materials.some(
                          (item) =>
                            item.toLowerCase() === material.toLowerCase(),
                        )
                      ) {
                        setMaterials([...materials, material]);
                        setMaterialInput("");
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="colors">Couleurs</label>

            <div className="materialsInput">
              <div className="materialsList">
                {colors.map((color, index) => (
                  <span className="materialTag" key={index}>
                    {color}

                    <button
                      type="button"
                      onClick={() =>
                        setColors(colors.filter((_, i) => i !== index))
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}

                <input
                  type="text"
                  id="colors"
                  value={colorInput}
                  placeholder="Écrire une couleur puis Entrée"
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      const color = colorInput.trim();

                      if (
                        color !== "" &&
                        !colors.some(
                          (item) => item.toLowerCase() === color.toLowerCase(),
                        )
                      ) {
                        setColors([...colors, color]);
                        setColorInput("");
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

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
                  placeholder="Longueur"
                  onChange={(e) =>
                    setDimensions({ ...dimensions, length: e.target.value })
                  }
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
                  placeholder="Largeur"
                  onChange={(e) =>
                    setDimensions({ ...dimensions, width: e.target.value })
                  }
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
                  placeholder="Hauteur"
                  onChange={(e) =>
                    setDimensions({ ...dimensions, height: e.target.value })
                  }
                />
              </div>

              <div className="formGroup">
                <label htmlFor="dimensionUnit">Unité</label>
                <select
                  id="dimensionUnit"
                  name="dimensionUnit"
                  onChange={(e) =>
                    setDimensions({ ...dimensions, unit: e.target.value })
                  }
                  value={dimensions.unit}
                >
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>
          </div>

          <div className="dimensionsInputs">
            <div className="formGroup">
              <label htmlFor="weight">Poids</label>
              <input
                type="number"
                id="weight"
                name="weight"
                min="0"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                placeholder="Poids"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="weightUnit">Unité du poids</label>
              <select
                id="weightUnit"
                name="weightUnit"
                onChange={(e) => setWeightUnit(e.target.value)}
                value={weightUnit}
              >
                <option value="g">Gramme (g)</option>
                <option value="kg">Kilogramme (kg)</option>
              </select>
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="origin">Origine du produit</label>
            <input
              type="text"
              id="origin"
              name="origin"
              placeholder="Exemple : Le Kef, Tunisie"
              onChange={(e) => setOrigin(e.target.value)}
              value={origin}
            />
          </div>
        </fieldset>

        {/* 4. Stock et disponibilité */}
        <fieldset>
          <legend>Stock et disponibilité</legend>

          <div className="formGroup">
            <label htmlFor="stock">Quantité en stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              placeholder="Quantité disponible"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="isAvailable">Disponibilité</label>
            <select
              id="isAvailable"
              name="isAvailable"
              onChange={(e) => setIsAvailable(e.target.value)}
              value={isAvailable}
            >
              <option value="true">Disponible</option>
              <option value="false">Indisponible</option>
            </select>
          </div>
        </fieldset>

        {/* 5. Promotion et validation */}
        <fieldset>
          <legend>Promotion et validation</legend>

          <div className="formGroup">
            <label htmlFor="discount">Réduction (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              min="0"
              max="100"
              placeholder="Pourcentage de réduction"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="status">Statut du produit</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">En attente</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
        </fieldset>

        <button type="submit">Ajouter le produit</button>
      </form>
    </div>
  );
};

export default AddProduct;
