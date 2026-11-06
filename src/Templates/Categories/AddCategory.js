import "./Category.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addCategory } from "../../Redux/Actions/CategoriesActions";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("isActive", String(isActive));

    if (image) {
      formData.append("image", image);
    }

    dispatch(addCategory(formData, navigate));
  };

  return (
    <div className="addCategoryContainer">
      <div className="addCategoryHeader">
        <h2>Ajouter une catégorie</h2>
        <p>
          Créez une nouvelle catégorie pour organiser les produits de votre
          boutique.
        </p>
      </div>

      <form className="addCategoryForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Nom de la catégorie</label>

          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            name="name"
            value={name}
            placeholder="Nom de la catégorie"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Description</label>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            name="description"
            value={description}
            placeholder="Description de la catégorie"
            rows="5"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="image">Image de la catégorie</label>

          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />

          {image && (
            <p className="selectedImageName">
              Image sélectionnée : {image.name}
            </p>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="isActive">Statut</label>

          <select
            id="isActive"
            name="isActive"
            value={String(isActive)}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="addCategoryActions">
          <button
            type="button"
            className="addCategoryCancel"
            onClick={() => navigate("/Dashboard/Categories")}
          >
            Annuler
          </button>

          <button type="submit" className="addCategorySubmit">
            <i className="ri-add-line"></i>
            Ajouter la catégorie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
