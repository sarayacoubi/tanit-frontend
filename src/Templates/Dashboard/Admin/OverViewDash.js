

// import "./overviewdash.css";

// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useMemo, useState } from "react";

// import { getAllUsers } from "../../../Redux/Actions/UsersActions";
// import { getAllProducts } from "../../../Redux/Actions/ProductsActions";
// import { getAllCategories } from "../../../Redux/Actions/CategoriesActions";
// import { getAllOrders } from "../../../Redux/Actions/OrdersActions";

// const OverViewDash = () => {
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(true);

//   // Récupération des données depuis Redux
//   const usersData = useSelector((state) => state.UsersReducer.users);

//   const productsData = useSelector((state) => state.ProductsReducer.products);

//   const categoriesData = useSelector(
//     (state) => state.CategoriesReducer.categories,
//   );

//   const ordersData = useSelector((state) => state.OrdersReducer.orders);

//   // Éviter les erreurs si les données sont encore vides
//   const users = Array.isArray(usersData) ? usersData : [];
//   const products = Array.isArray(productsData) ? productsData : [];
//   const categories = Array.isArray(categoriesData) ? categoriesData : [];
//   const orders = Array.isArray(ordersData) ? ordersData : [];

//   // Charger les données depuis la base de données
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         await Promise.all([
//           dispatch(getAllUsers()),
//           dispatch(getAllProducts()),
//           dispatch(getAllCategories()),
//           dispatch(getAllOrders()),
//         ]);
//       } catch (error) {
//         console.error("Erreur chargement dashboard :", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [dispatch]);

//   // Catégories actives
//   const activeCategories = categories.filter(
//     (category) => category.isActive === true,
//   );

//   // Activités récentes
//   const recentActivities = useMemo(() => {
//     const activities = [
//       ...products.map((product) => ({
//         id: product._id,
//         type: "product",
//         title: "Nouveau produit",
//         description: product.name,
//         date: product.createdAt,
//         icon: "ri-box-3-line",
//         color: "statPurple",
//       })),

//       ...users.map((user) => ({
//         id: user._id,
//         type: "user",
//         title: "Nouvel utilisateur",
//         description: user.name || user.email,
//         date: user.createdAt,
//         icon: "ri-user-add-line",
//         color: "statBlue",
//       })),

//       ...orders.map((order) => ({
//         id: order._id,
//         type: "order",
//         title: "Nouvelle commande",
//         description: `Commande #${order._id?.slice(-6)} - ${
//           order.totalPrice ?? 0
//         } DT`,
//         date: order.createdAt,
//         icon: "ri-shopping-bag-3-line",
//         color: "statGreen",
//       })),
//     ];

//     return activities
//       .filter((activity) => activity.date)
//       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//       .slice(0, 6);
//   }, [products, users, orders]);

//   // Formater les dates
//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleString("fr-TN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="overviewDash">
//       {/* Welcome section */}
//       <div className="overviewWelcome">
//         <div>
//           <h1>Bienvenue sur Tanit 👋</h1>
//           <p>Voici un aperçu de l'activité de votre boutique artisanale.</p>
//         </div>

//         <span className="overviewDate">Espace administrateur</span>
//       </div>

//       {/* Statistics */}
//       <div className="overviewSection">
//         <div className="overviewSectionHeader">
//           <h2>Vue générale</h2>
//           <p>Les indicateurs de votre boutique</p>
//         </div>

//         <div className="overviewStats">
//           {/* Produits */}
//           <div className="overviewStatCard">
//             <div className="statIcon statPurple">
//               <i className="ri-box-3-line"></i>
//             </div>

//             <div>
//               <span>Total produits</span>
//               <h3>{loading ? "..." : products.length}</h3>
//               <small>Produits enregistrés</small>
//             </div>
//           </div>

//           {/* Catégories */}
//           <div className="overviewStatCard">
//             <div className="statIcon statPink">
//               <i className="ri-grid-line"></i>
//             </div>

//             <div>
//               <span>Catégories</span>
//               <h3>{loading ? "..." : activeCategories.length}</h3>
//               <small>Catégories disponibles</small>
//             </div>
//           </div>

//           {/* Utilisateurs */}
//           <div className="overviewStatCard">
//             <div className="statIcon statBlue">
//               <i className="ri-group-line"></i>
//             </div>

//             <div>
//               <span>Utilisateurs</span>
//               <h3>{loading ? "..." : users.length}</h3>
//               <small>Comptes enregistrés</small>
//             </div>
//           </div>

//           {/* Commandes */}
//           <div className="overviewStatCard">
//             <div className="statIcon statGreen">
//               <i className="ri-shopping-bag-3-line"></i>
//             </div>

//             <div>
//               <span>Commandes</span>
//               <h3>{loading ? "..." : orders.length}</h3>
//               <small>Commandes reçues</small>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick access */}
//       <div className="overviewSection">
//         <div className="overviewSectionHeader">
//           <h2>Accès rapide</h2>
//           <p>Gérez facilement votre boutique</p>
//         </div>

//         <div className="overviewQuickAccess">
//           <div className="quickAccessCard">
//             <div className="quickIcon statPurple">
//               <i className="ri-add-circle-line"></i>
//             </div>
//             <h3>Ajouter un produit</h3>
//             <p>Enregistrer un nouvel article artisanal.</p>
//           </div>

//           <div className="quickAccessCard">
//             <div className="quickIcon statPink">
//               <i className="ri-folder-add-line"></i>
//             </div>
//             <h3>Ajouter une catégorie</h3>
//             <p>Organiser les produits de votre boutique.</p>
//           </div>

//           <div className="quickAccessCard">
//             <div className="quickIcon statBlue">
//               <i className="ri-shopping-bag-line"></i>
//             </div>
//             <h3>Consulter les commandes</h3>
//             <p>Suivre les commandes de vos clients.</p>
//           </div>
//         </div>
//       </div>

//       {/* Recent activity */}
//       <div className="overviewSection">
//         <div className="overviewSectionHeader">
//           <h2>Activité récente</h2>
//           <p>Les dernières activités de votre boutique</p>
//         </div>

//         <div className="overviewActivity">
//           {loading ? (
//             <div className="activityEmpty">
//               <p>Chargement des activités...</p>
//             </div>
//           ) : recentActivities.length === 0 ? (
//             <div className="activityEmpty">
//               <i className="ri-inbox-line"></i>
//               <h3>Aucune activité récente</h3>
//               <p>Les nouvelles activités apparaîtront ici.</p>
//             </div>
//           ) : (
//             <div className="activityList">
//               {recentActivities.map((activity) => (
//                 <div
//                   className="activityItem"
//                   key={`${activity.type}-${activity.id}`}
//                 >
//                   <div className={`activityIcon ${activity.color}`}>
//                     <i className={activity.icon}></i>
//                   </div>

//                   <div className="activityInfo">
//                     <h3>{activity.title}</h3>
//                     <p>{activity.description}</p>
//                   </div>

//                   <span className="activityDate">
//                     {formatDate(activity.date)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverViewDash;





import "./overviewdash.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { getAllUsers } from "../../../Redux/Actions/UsersActions";
import { getAllProducts } from "../../../Redux/Actions/ProductsActions";
import { getAllCategories } from "../../../Redux/Actions/CategoriesActions";
import { getAllOrders } from "../../../Redux/Actions/OrdersActions";

const OverViewDash = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // Récupération des données depuis Redux
  const usersData = useSelector(
    (state) => state.UsersReducer.users
  );

  const productsData = useSelector(
    (state) => state.ProductsReducer.products
  );

  const categoriesData = useSelector(
    (state) => state.CategoriesReducer.categories
  );

  const ordersData = useSelector(
    (state) => state.OrdersReducer.orders
  );

  // Vérification et stabilisation des tableaux
  const users = useMemo(
    () => (Array.isArray(usersData) ? usersData : []),
    [usersData]
  );

  const products = useMemo(
    () => (Array.isArray(productsData) ? productsData : []),
    [productsData]
  );

  const categories = useMemo(
    () => (Array.isArray(categoriesData) ? categoriesData : []),
    [categoriesData]
  );

  const orders = useMemo(
    () => (Array.isArray(ordersData) ? ordersData : []),
    [ordersData]
  );

  // Chargement des données depuis la base de données
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await Promise.all([
          dispatch(getAllUsers()),
          dispatch(getAllProducts()),
          dispatch(getAllCategories()),
          dispatch(getAllOrders()),
        ]);
      } catch (error) {
        console.error(
          "Erreur chargement dashboard :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  // Catégories actives
  const activeCategories = useMemo(
    () => categories.filter(
      (category) => category.isActive === true
    ),
    [categories]
  );

  // Activités récentes
  const recentActivities = useMemo(() => {
    const activities = [
      ...products.map((product) => ({
        id: product._id,
        type: "product",
        title: "Nouveau produit",
        description: product.name,
        date: product.createdAt,
        icon: "ri-box-3-line",
        color: "statPurple",
      })),

      ...users.map((user) => ({
        id: user._id,
        type: "user",
        title: "Nouvel utilisateur",
        description: user.name || user.email,
        date: user.createdAt,
        icon: "ri-user-add-line",
        color: "statBlue",
      })),

      ...orders.map((order) => ({
        id: order._id,
        type: "order",
        title: "Nouvelle commande",
        description: `Commande #${order._id?.slice(-6)} - ${
          order.totalPrice ?? 0
        } DT`,
        date: order.createdAt,
        icon: "ri-shopping-bag-3-line",
        color: "statGreen",
      })),
    ];

    return activities
      .filter((activity) => activity.date)
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 6);
  }, [products, users, orders]);

  // Formater les dates
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("fr-TN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="overviewDash">

      {/* Welcome section */}
      <div className="overviewWelcome">
        <div>
          <h1>Bienvenue sur Tanit 👋</h1>
          <p>
            Voici un aperçu de l'activité de votre boutique artisanale.
          </p>
        </div>

        <span className="overviewDate">
          Espace administrateur
        </span>
      </div>

      {/* Statistics */}
      <div className="overviewSection">
        <div className="overviewSectionHeader">
          <h2>Vue générale</h2>
          <p>Les indicateurs de votre boutique</p>
        </div>

        <div className="overviewStats">

          {/* Produits */}
          <div className="overviewStatCard">
            <div className="statIcon statPurple">
              <i className="ri-box-3-line"></i>
            </div>

            <div>
              <span>Total produits</span>
              <h3>{loading ? "..." : products.length}</h3>
              <small>Produits enregistrés</small>
            </div>
          </div>

          {/* Catégories */}
          <div className="overviewStatCard">
            <div className="statIcon statPink">
              <i className="ri-grid-line"></i>
            </div>

            <div>
              <span>Catégories</span>
              <h3>
                {loading ? "..." : activeCategories.length}
              </h3>
              <small>Catégories disponibles</small>
            </div>
          </div>

          {/* Utilisateurs */}
          <div className="overviewStatCard">
            <div className="statIcon statBlue">
              <i className="ri-group-line"></i>
            </div>

            <div>
              <span>Utilisateurs</span>
              <h3>{loading ? "..." : users.length}</h3>
              <small>Comptes enregistrés</small>
            </div>
          </div>

          {/* Commandes */}
          <div className="overviewStatCard">
            <div className="statIcon statGreen">
              <i className="ri-shopping-bag-3-line"></i>
            </div>

            <div>
              <span>Commandes</span>
              <h3>{loading ? "..." : orders.length}</h3>
              <small>Commandes reçues</small>
            </div>
          </div>

        </div>
      </div>

      {/* Quick access */}
      <div className="overviewSection">
        <div className="overviewSectionHeader">
          <h2>Accès rapide</h2>
          <p>Gérez facilement votre boutique</p>
        </div>

        <div className="overviewQuickAccess">

          <div className="quickAccessCard">
            <div className="quickIcon statPurple">
              <i className="ri-add-circle-line"></i>
            </div>
            <h3>Ajouter un produit</h3>
            <p>
              Enregistrer un nouvel article artisanal.
            </p>
          </div>

          <div className="quickAccessCard">
            <div className="quickIcon statPink">
              <i className="ri-folder-add-line"></i>
            </div>
            <h3>Ajouter une catégorie</h3>
            <p>
              Organiser les produits de votre boutique.
            </p>
          </div>

          <div className="quickAccessCard">
            <div className="quickIcon statBlue">
              <i className="ri-shopping-bag-line"></i>
            </div>
            <h3>Consulter les commandes</h3>
            <p>
              Suivre les commandes de vos clients.
            </p>
          </div>

        </div>
      </div>

      {/* Recent activity */}
      <div className="overviewSection">
        <div className="overviewSectionHeader">
          <h2>Activité récente</h2>
          <p>Les dernières activités de votre boutique</p>
        </div>

        <div className="overviewActivity">

          {loading ? (
            <div className="activityEmpty">
              <p>Chargement des activités...</p>
            </div>
          ) : recentActivities.length === 0 ? (
            <div className="activityEmpty">
              <i className="ri-inbox-line"></i>
              <h3>Aucune activité récente</h3>
              <p>
                Les nouvelles activités apparaîtront ici.
              </p>
            </div>
          ) : (
            <div className="activityList">

              {recentActivities.map((activity) => (
                <div
                  className="activityItem"
                  key={`${activity.type}-${activity.id}`}
                >
                  <div className={`activityIcon ${activity.color}`}>
                    <i className={activity.icon}></i>
                  </div>

                  <div className="activityInfo">
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                  </div>

                  <span className="activityDate">
                    {formatDate(activity.date)}
                  </span>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default OverViewDash;

