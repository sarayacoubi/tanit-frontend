// import { Link } from "react-router-dom";
// import "./products.css";

// const products = [
//   {
//     id: 1,
//     name: "Vase en céramique",
//     category: "Céramique",
//     price: 45,
//     image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=700",
//   },
//   {
//     id: 2,
//     name: "Panier artisanal",
//     category: "Vannerie",
//     price: 35,
//     image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700",
//   },
//   {
//     id: 3,
//     name: "Décoration naturelle",
//     category: "Décoration",
//     price: 55,
//     image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700",
//   },
//   {
//     id: 4,
//     name: "Objet décoratif",
//     category: "Décoration",
//     price: 29,
//     image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700",
//   },
//   {
//     id: 5,
//     name: "Création en céramique",
//     category: "Céramique",
//     price: 48,
//     image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700",
//   },
//   {
//     id: 6,
//     name: "Accessoire artisanal",
//     category: "Textile",
//     price: 32,
//     image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=700",
//   },
//   {
//     id: 7,
//     name: "Panier traditionnel",
//     category: "Vannerie",
//     price: 40,
//     image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=700",
//   },
//   {
//     id: 8,
//     name: "Pièce décorative",
//     category: "Décoration",
//     price: 60,
//     image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=700",
//   },
// ];

// const Products = () => {
//   return (
//     <main className="productsPage">
//       {/* PAGE BANNER */}
//       <section className="productsBanner">
//         <div className="productsBannerContent">
//           <span>Découvrez notre collection</span>
//           <h1>Nos créations artisanales</h1>
//           <p>
//             Des pièces uniques qui mettent en valeur le savoir-faire et la
//             créativité tunisienne.
//           </p>

//           <div className="breadcrumb">
//             <Link to="/">Accueil</Link>
//             <span>/</span>
//             <span>Produits</span>
//           </div>
//         </div>
//       </section>

//       {/* PRODUCTS CONTENT */}
//       <section className="productsContainer">
//         <div className="productsPageHeading">
//           <div>
//             <span>Notre boutique</span>
//             <h2>Tous nos produits</h2>
//           </div>

//           <p>{products.length} produits</p>
//         </div>

//         {/* SEARCH AND FILTERS */}
//         <div className="productsToolbar">
//           <div className="productsSearch">
//             <span>⌕</span>
//             <input type="text" placeholder="Rechercher un produit..." />
//           </div>

//           <select defaultValue="">
//             <option value="" disabled>
//               Toutes les catégories
//             </option>
//             <option value="ceramique">Céramique</option>
//             <option value="vannerie">Vannerie</option>
//             <option value="textile">Textile</option>
//             <option value="decoration">Décoration</option>
//           </select>

//           <select defaultValue="recent">
//             <option value="recent">Plus récents</option>
//             <option value="priceAsc">Prix croissant</option>
//             <option value="priceDesc">Prix décroissant</option>
//           </select>
//         </div>

//         {/* PRODUCTS GRID */}
//         <div className="shopProductsGrid">
//           {products.map((product) => (
//             <article className="shopProductCard" key={product.id}>
//               <div className="shopProductImage">
//                 <img src={product.image} alt={product.name} />
//                 <span className="productCategory">{product.category}</span>
//               </div>

//               <div className="shopProductInfo">
//                 <h3>{product.name}</h3>

//                 <div className="shopProductBottom">
//                   <span className="shopProductPrice">{product.price} DT</span>

//                   <Link
//                     to={`/Products/${product.id}`}
//                     className="viewProductButton"
//                   >
//                     Voir le produit
//                   </Link>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {/* PAGINATION */}
//         <div className="productsPagination">
//           <button type="button" disabled>
//             Précédent
//           </button>

//           <button type="button" className="paginationActive">
//             1
//           </button>

//           <button type="button">2</button>
//           <button type="button">3</button>

//           <button type="button">Suivant</button>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Products;

const Products = () => {
  const dispatch = useDispatch();

  // Récupération depuis Redux
  const products = useSelector((state) => state.ProductsReducer.products);

  const categories = useSelector((state) => state.CategoriesReducer.categories);

  const loading = useSelector((state) => state.ProductsReducer.loading);

  // États des filtres
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  // Récupération des données depuis MongoDB
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  console.log(products)
  console.log()
  // Normalisation pour ignorer les accents
  const normalizeText = (text = "") =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  // Filtrage et tri
  const filteredProducts = useMemo(() => {
    let result = (products || []).filter(
      (product) => product.status === "approved",
    );

    // Recherche par nom
    if (search.trim()) {
      result = result.filter((product) =>
        normalizeText(product.name).includes(normalizeText(search)),
      );
    }

    // Filtrage par catégorie
    if (selectedCategory) {
      result = result.filter((product) => {
        const categoryId = product.category?._id || product.category;

        return categoryId === selectedCategory;
      });
    }

    // Tri par prix
    if (sortOrder === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, selectedCategory, sortOrder]);

  // Réinitialisation
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSortOrder("recent");
  };

  // Affichage pendant le chargement
  if (loading) {
    return <Loading />;
  }

  return (
    <main className="productsPage">
      {/* BANNER */}
      <section className="productsBanner">
        <div className="productsBannerContent">
          <span>Découvrez notre collection</span>

          <h1>Nos créations artisanales</h1>

          <p>
            Des pièces uniques qui mettent en valeur le savoir-faire et la
            créativité tunisienne.
          </p>

          <div className="breadcrumb">
            <Link to="/">Accueil</Link>
            <span>/</span>
            <span>Produits</span>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="productsContainer">
        <div className="productsPageHeading">
          <div>
            <span>Notre boutique</span>
            <h2>Tous nos produits</h2>
          </div>

          <p>{filteredProducts.length} produit(s)</p>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="productsToolbar">
          {/* SEARCH */}
          <div className="productsSearch">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="clearSearch"
              >
                ×
              </button>
            )}
          </div>

          {/* CATEGORY */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>

            {categories
              ?.filter((cat) => cat.isActive === true)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>

          {/* SORT */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="recent">Plus récents</option>
            <option value="priceAsc">Prix croissant</option>
            <option value="priceDesc">Prix décroissant</option>
          </select>

          <button type="button" className="resetFilters" onClick={resetFilters}>
            Réinitialiser
          </button>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="shopProductsGrid">
            {filteredProducts.map((product) => {
              const imageUrl = product.images?.[0]
                ? product.images[0].startsWith("http")
                  ? product.images[0]
                  : `http://localhost:5000${product.images[0]}`
                : product.mainImage
                  ? `http://localhost:5000${product.mainImage}`
                  : null;

              return (
                <article className="shopProductCard" key={product._id}>
                  <div className="shopProductImage">
                    {imageUrl && <img src={imageUrl} alt={product.name} />}

                    <span className="productCategory">
                      {product.category?.name}
                    </span>
                  </div>

                  <div className="shopProductInfo">
                    <h3>{product.name}</h3>

                    <div className="shopProductBottom">
                      <span className="shopProductPrice">
                        {product.price} DT
                      </span>

                      <Link
                        to={`/Products/${product._id}`}
                        className="viewProductButton"
                      >
                        Voir le produit
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="noProductsFound">
            <span>⌕</span>
            <h3>Aucun produit trouvé</h3>

            <p>Aucun produit ne correspond à votre recherche.</p>

            <button onClick={resetFilters}>Afficher tous les produits</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
