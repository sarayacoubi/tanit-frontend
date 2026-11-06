

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


  const apiURL = process.env.REACT_APP_API_URL;
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
                  : `${apiURL}/${product.images[0]}`
                : product.mainImage
                  ? `${apiURL}${product.mainImage}`
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
