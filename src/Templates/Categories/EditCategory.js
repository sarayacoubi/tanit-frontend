import "./editcategory.css";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../Feedback/Loading";

import {
  getOneCategory,
  editCategory,
} from "../../Redux/Actions/CategoriesActions";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const category = useSelector((state) => state.CategoriesReducer.category);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  // Récupérer la catégorie
  useEffect(() => {
    dispatch(getOneCategory(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  // Remplir les champs après récupération
  useEffect(() => {
    if (category && category._id === id) {
      setName(category.name || "");
      setDescription(category.description || "");
      setIsActive(category.isActive ?? true);
      setCurrentImage(category.image || "");
      setImage(null);
    }
  }, [category, id]);

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("isActive", String(isActive));

    // Ajouter une image seulement si une nouvelle image est choisie
    if (image) {
      formData.append("image", image);
    }

    dispatch(editCategory(id, formData, navigate));
  };

  if (loading) {
    return <Loading show={loading} />;
  }
  return (
    <div className="editCategory">
      <div className="editCategoryHeader">
        <div>
          <h2>Modifier une catégorie</h2>
          <p className="editCategoryDescription">
            Modifiez les informations de votre catégorie.
          </p>
        </div>
      </div>

      {category?._id === id ? (
        <form className="editCategoryForm" onSubmit={handleSubmit}>
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
            <label>Image actuelle</label>

            {currentImage && (
              <div className="currentCategoryImage">
                <img
                  src={`http://localhost:5000/uploads/categories/${currentImage}`}
                  alt={category.name}
                />
              </div>
            )}
          </div>

          <div className="formGroup">
            <label htmlFor="image">Changer l'image</label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />

            {image && (
              <p className="selectedImageName">Nouvelle image : {image.name}</p>
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

          <div className="editCategoryActions">
            <button
              type="button"
              className="editCategoryCancel"
              onClick={() => navigate("/Dashboard/Categories")}
            >
              Annuler
            </button>

            <button type="submit" className="editCategorySubmit">
              <i className="ri-save-line"></i>
              Enregistrer
            </button>
          </div>
        </form>
      ) : (
        <p className="categoryLoading">Chargement de la catégorie...</p>
      )}
    </div>
  );
};

export default EditCategory;
