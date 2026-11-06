import "./Category.css";
import CategoryCard from "./CategoryCard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCategories } from "../../Redux/Actions/CategoriesActions";
import Loading from "../Feedback/Loading";
const CategoriesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const categories = useSelector((state) => state.CategoriesReducer.categories);

  useEffect(() => {
    dispatch(getAllCategories()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loading show={loading} />;
  }

  return (
    <div className="categorieContainer">
      <div className="categoriesHeader">
        <h2>Gestion des catégories</h2>

        <button
          className="addCategoryBtn"
          type="button"
          onClick={() => navigate("/Dashboard/AddCategory")}
        >
          + Ajouter une catégorie
        </button>
      </div>

      <div className="categoriesGrid">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard category={category} key={category._id} />
          ))
        ) : (
          <p className="emptyCategories">Aucune catégorie disponible.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
