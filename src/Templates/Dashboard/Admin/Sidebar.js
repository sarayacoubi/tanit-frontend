
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.UsersReducer.user);
  const role = user?.role;

  const closeMenu = () => setMenuOpen(false);

  // Liens selon le rôle
  const menuByRole = {
    admin: [
      {
        path: "/Dashboard",
        label: "Aperçu",
        icon: "ri-dashboard-line",
        end: true,
      },
      {
        path: "/Dashboard/Products",
        label: "Produits",
        icon: "ri-box-3-line",
      },
      {
        path: "/Dashboard/Categories",
        label: "Catégories",
        icon: "ri-grid-line",
      },
      {
        path: "/Dashboard/Users",
        label: "Utilisateurs",
        icon: "ri-group-line",
      },
      {
        path: "/Dashboard/Stock",
        label: "Stock",
        icon: "ri-database-2-line",
        disabled: true,
      },
      {
        path: "/Dashboard/Orders",
        label: "Commandes",
        icon: "ri-shopping-bag-3-line",
      },
    ],

    artisan: [
      {
        path: "/Dashboard",
        label: "Aperçu",
        icon: "ri-dashboard-line",
        end: true,
      },
      {
        path: "/Dashboard/Products",
        label: "Mes produits",
        icon: "ri-box-3-line",
      },
      {
        path: "/Dashboard/Orders",
        label: "Mes commandes",
        icon: "ri-shopping-bag-3-line",
      },
    ],

    livreur: [
      {
        path: "/Dashboard",
        label: "Aperçu",
        icon: "ri-dashboard-line",
        end: true,
      },
      {
        path: "/Dashboard/Orders",
        label: "Commandes à livrer",
        icon: "ri-truck-line",
      },
    ],
  };

  const menuItems = menuByRole[role] || [];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="sidebarMobileToggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Ouvrir le menu"
      >
        <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="sidebarOverlay" onClick={closeMenu} />
      )}

      <aside className={`sidebar ${menuOpen ? "sidebarOpen" : ""}`}>
        {/* Logo */}
        <div className="sidebarBrand">
          <div className="brandLogo">T</div>

          <div className="brandText">
            <h2>Tanit</h2>
            <span>
              {role === "admin" && "Administration"}
              {role === "artisan" && "Espace artisan"}
              {role === "livreur" && "Espace livreur"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="sidebarNavigation">
          <p className="sidebarSectionTitle">MENU PRINCIPAL</p>

          <ul className="dashItems">
            {menuItems.map((item) => (
              <li key={item.path}>
                {item.disabled ? (
                  <div className="sidebarDisabledItem">
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    <small>Bientôt</small>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.end || false}
                    onClick={closeMenu}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar bottom */}
        <div className="sidebarBottom">
          <div className="sidebarHelp">
            <div className="sidebarHelpIcon">
              <i className="ri-store-2-line"></i>
            </div>

            <div>
              <h4>Votre boutique</h4>
              <p>Consultez votre vitrine</p>
            </div>
          </div>

          <button
            className="sidebarShopBtn"
            onClick={() => {
              closeMenu();
              navigate("/");
            }}
          >
            <i className="ri-external-link-line"></i>
            Voir la boutique
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
