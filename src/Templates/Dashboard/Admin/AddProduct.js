import "../../../Styles/Dashboard/Admin/Addproduct.css";

const AddProduct = () => {
  return (
    <div className="addProduct">
      <h2>Ajouter un produit</h2>
      <p>Ajoutez un nouveau produit artisanal à votre boutique.</p>

      <form className="addProductForm">
        <div className="formGroup">
          <label htmlFor="name">Nom du produit</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nom du produit"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description du produit"
            required
          />
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label htmlFor="price">Prix (TND)</label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Prix"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              placeholder="Quantité en stock"
              min="0"
              required
            />
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="category">Catégorie</label>
          <select id="category" name="category" required>
            <option value="">Choisir une catégorie</option>
            <option value="artisanat">Artisanat</option>
            <option value="poterie">Poterie</option>
            <option value="textile">Textile</option>
            <option value="bijoux">Bijoux</option>
          </select>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label htmlFor="materials">Matériaux</label>
            <input
              id="materials"
              name="materials"
              type="text"
              placeholder="Ex. : laine, bois..."
            />
          </div>

          <div className="formGroup">
            <label htmlFor="color">Couleur</label>
            <input
              id="color"
              name="color"
              type="text"
              placeholder="Ex. : beige"
            />
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="images">Photos du produit</label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
          />
        </div>

        <button type="submit">
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;