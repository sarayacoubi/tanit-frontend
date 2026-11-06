import { useNavigate } from "react-router-dom";
import { deleteOneCategory } from "../../Redux/Actions/CategoriesActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./categorycard.css";
import ConfirmDelete from "../Feedback/ConfirmDelete";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  // Ouvrir la fenêtre de confirmation
  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  // Annuler la suppression
  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  // Confirmer la suppression
  const handleConfirmDelete = () => {
    dispatch(deleteOneCategory(category._id, navigate));
    setShowConfirm(false);
  };

    const apiURL = process.env.REACT_APP_API_URL;
  return (
    <>
      <div className="categoryCard">
        <div className="categoryImageContainer">
          <img
            src={`${apiURL}/uploads/categories/${category.image}`}
            alt={category.name}
            className="categoryImage"
          />

          <span
            className={`categoryBadge ${
              category.isActive ? "active" : "inactive"
            }`}
          >
            {category.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="categoryCardContent">
          <h3>{category.name}</h3>

          <p className="categoryDescription">
            {category.description || "Aucune description disponible."}
          </p>

          <div className="categoryCardActions">
            <button
              onClick={() =>
                navigate(`/Dashboard/EditCategory/${category._id}`)
              }
              type="button"
              className="editCategoryBtn"
            >
              <i className="ri-edit-line"></i>
              Modifier
            </button>

            <button
              type="button"
              className="deleteCategoryBtn"
              onClick={handleDeleteClick}
            >
              <i className="ri-delete-bin-line"></i>
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation de suppression */}
      <ConfirmDelete
        isOpen={showConfirm}
        title="Supprimer la catégorie"
        message={`Voulez-vous vraiment supprimer la catégorie "${category.name}" ? Cette action est irréversible.`}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default CategoryCard;
