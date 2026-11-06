

import "./Header.css";
import sajnen from "../../../Assets/Images/sajnen.jpg";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ProfileAdmin from "./ProfileAdmin";
import { currentUser } from "../../../Redux/Actions/UsersActions";

const HeaderDash = () => {
  const token = localStorage.getItem("Usertoken");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.UsersReducer.user);

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(currentUser());
    }
  }, [dispatch, token]);

  // Récupérer la photo de profil
  const getProfileImage = () => {
    if (user?.profilePicture) {
      return `http://localhost:5000/uploads/users/${user.profilePicture}`;
    }

    return sajnen;
  };

  return (
    <>
      <header className="headerdash">
        <div className="headerWelcome">
          <h1>Tableau de bord</h1>
          <p>Bienvenue dans votre espace d'administration</p>
        </div>

        <div className="headerActions">
          <button className="headerIconBtn" aria-label="Notifications">
            <i className="ri-notification-3-line"></i>
            <span className="notificationDot"></span>
          </button>

          <div className="headerDivider"></div>

          <button
            type="button"
            className="profile"
            onClick={() => setShowProfile(true)}
          >
            <img
              src={getProfileImage()}
              alt="Profil administrateur"
              onError={(e) => {
                e.currentTarget.src = sajnen;
              }}
            />

            <div className="profileInfo">
              <h3>{user?.name || "Administrateur"}</h3>
              <span>Administrateur</span>
            </div>

            <i className="ri-arrow-down-s-line profileArrow"></i>
          </button>
        </div>
      </header>

      {showProfile && user && (
        <ProfileAdmin user={user} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default HeaderDash;
