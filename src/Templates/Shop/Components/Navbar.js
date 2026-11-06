// import { useEffect, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { currentUser, logout } from "../../../Redux/Actions/UsersActions";

// import "./navbar.css";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);

//   const token = localStorage.getItem("Usertoken");

//   const user = useSelector((state) => state.UsersReducer.user);
//   const cartItems = useSelector((state) => state.CartReducer.cartItems);

//   // Calculer le nombre total d'articles
//   const totalQuantity = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0,
//   );

//   // Récupérer l'utilisateur connecté
//   useEffect(() => {
//     if (token) {
//       dispatch(currentUser());
//     }
//   }, [dispatch, token]);

//   // Fermer le menu mobile
//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   // Déconnexion
//   const handleLogout = () => {
//     dispatch(logout());
//     closeMenu();
//     navigate("/");
//   };

//   // Style des liens actifs
//   const navLinkClass = ({ isActive }) =>
//     isActive ? "navLink active" : "navLink";

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <Link to="/" className="logo" onClick={closeMenu}>
//         <span className="logoIcon">
//           <i className="ri-leaf-line"></i>
//         </span>
//         <span>Tanit</span>
//       </Link>

//       {/* Menu principal */}
//       <ul className={`navItems ${menuOpen ? "showMenu" : ""}`}>
//         {/* Accueil */}
//         <li>
//           <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
//             Accueil
//           </NavLink>
//         </li>

//         {/* Produits */}
//         <li>
//           <NavLink to="/Products" className={navLinkClass} onClick={closeMenu}>
//             Produits
//           </NavLink>
//         </li>

//         {/* Utilisateur connecté */}
//         {token && user?._id ? (
//           <>
//             {/* CLIENT */}
//             {user.role === "client" && (
//               <>
//                 {/* Mon profil */}
//                 <li>
//                   <NavLink
//                     to="/Profile"
//                     className={navLinkClass}
//                     onClick={closeMenu}
//                   >
//                     Mon profil
//                   </NavLink>
//                 </li>

//                 {/* Mes commandes */}
//                 <li>
//                   <NavLink
//                     to="/MyOrders"
//                     className={navLinkClass}
//                     onClick={closeMenu}
//                   >
//                     Mes commandes
//                   </NavLink>
//                 </li>

//                 {/* Panier */}
//                 <li>
//                   <NavLink
//                     to="/Cart"
//                     className={({ isActive }) =>
//                       isActive ? "cartNavLink active" : "cartNavLink"
//                     }
//                     onClick={closeMenu}
//                     aria-label={`Mon panier, ${totalQuantity} article(s)`}
//                   >
//                     <i className="ri-shopping-cart-2-line"></i>

//                     <span>Panier</span>

//                     {totalQuantity > 0 && (
//                       <span className="cartBadge">{totalQuantity}</span>
//                     )}
//                   </NavLink>
//                 </li>
//               </>
//             )}

//             {/* ADMIN */}
//             {user.role === "admin" && (
//               <li>
//                 <NavLink
//                   to="/Dashboard/Admin"
//                   className={navLinkClass}
//                   onClick={closeMenu}
//                 >
//                   Tableau de bord
//                 </NavLink>
//               </li>
//             )}

//             {/* ARTISAN */}
//             {user.role === "artisan" && (
//               <li>
//                 <NavLink
//                   to="/Dashboard"
//                   className={navLinkClass}
//                   onClick={closeMenu}
//                 >
//                   Espace artisan
//                 </NavLink>
//               </li>
//             )}

//             {/* Déconnexion */}
//             <li>
//               <button
//                 type="button"
//                 className="logoutBtn"
//                 onClick={handleLogout}
//               >
//                 <i className="ri-logout-box-r-line"></i>
//                 Déconnexion
//               </button>
//             </li>
//           </>
//         ) : !token ? (
//           <>
//             {/* Connexion */}
//             <li>
//               <NavLink to="/Login" className={navLinkClass} onClick={closeMenu}>
//                 Connexion
//               </NavLink>
//             </li>

//             {/* Inscription */}
//             <li>
//               <NavLink
//                 to="/Register"
//                 className="registerBtn"
//                 onClick={closeMenu}
//               >
//                 Inscription
//               </NavLink>
//             </li>
//           </>
//         ) : null}
//       </ul>

//       {/* Menu mobile */}
//       <button
//         type="button"
//         className="menuToggle"
//         onClick={() => setMenuOpen((previous) => !previous)}
//         aria-label="Ouvrir le menu"
//         aria-expanded={menuOpen}
//       >
//         <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
//       </button>
//     </nav>
//   );
// };

// export default Navbar;

import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { currentUser, logout } from "../../../Redux/Actions/UsersActions";

import "./navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("Usertoken");

  const user = useSelector((state) => state.UsersReducer.user);
  const cartItems = useSelector((state) => state.CartReducer.cartItems);

  const isAuthenticated = Boolean(token && user?._id);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    if (token) {
      dispatch(currentUser());
    }
  }, [dispatch, token]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "navLink active" : "navLink";

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <span className="logoIcon">
          <i className="ri-leaf-line"></i>
        </span>
        <span>Tanit</span>
      </Link>

      {/* Menu principal */}
      <ul className={`navItems ${menuOpen ? "showMenu" : ""}`}>
        <li>
          <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
            Accueil
          </NavLink>
        </li>

        <li>
          <NavLink to="/Products" className={navLinkClass} onClick={closeMenu}>
            Produits
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            {/* CLIENT */}
            {user.role === "client" && (
              <>
                <li>
                  <NavLink
                    to="/Profile"
                    className={navLinkClass}
                    onClick={closeMenu}
                  >
                    Mon profil
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/MyOrders"
                    className={navLinkClass}
                    onClick={closeMenu}
                  >
                    Mes commandes
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/Cart"
                    className={({ isActive }) =>
                      isActive ? "cartNavLink active" : "cartNavLink"
                    }
                    onClick={closeMenu}
                  >
                    <i className="ri-shopping-cart-2-line"></i>
                    <span>Panier</span>

                    {totalQuantity > 0 && (
                      <span className="cartBadge">{totalQuantity}</span>
                    )}
                  </NavLink>
                </li>
              </>
            )}

            {/* ADMIN */}
            {user.role === "admin" && (
              <li>
                <NavLink
                  to="/Dashboard"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  Tableau de bord
                </NavLink>
              </li>
            )}

            {/* ARTISAN */}
            {user.role === "artisan" && (
              <li>
                <NavLink
                  to="/Dashboard"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  Espace artisan
                </NavLink>
              </li>
            )}

            {/* LIVREUR */}
            {user.role === "livreur" && (
              <li>
                <NavLink
                  to="/Dashboard/Livreur"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  Espace livreur
                </NavLink>
              </li>
            )}

            <li>
              <button
                type="button"
                className="logoutBtn"
                onClick={handleLogout}
              >
                <i className="ri-logout-box-r-line"></i>
                Déconnexion
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Connexion */}
            <li>
              <NavLink to="/Login" className={navLinkClass} onClick={closeMenu}>
                Connexion
              </NavLink>
            </li>

            {/* Inscription */}
            <li>
              <NavLink
                to="/Register"
                className="registerBtn"
                onClick={closeMenu}
              >
                Inscription
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Menu mobile */}
      <button
        type="button"
        className="menuToggle"
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label="Ouvrir le menu"
        aria-expanded={menuOpen}
      >
        <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
      </button>
    </nav>
  );
};

export default Navbar;
