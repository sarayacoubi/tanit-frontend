import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, editoneuser } from "../../../Redux/Actions/UsersActions";
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.UsersReducer.user);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);


  const apiURL = process.env.REACT_APP_API_URL;
  // Remplir les champs avec les informations de l'utilisateur
  useEffect(() => {
    if (user?._id) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });

      setPreview(
        user.profilePicture
          ? `${apiURL}/uploads/users/${user.profilePicture}`
          : "",
      );
    }
  }, [user]);

  // Modifier les champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Sélectionner une nouvelle photo
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Annuler la modification
  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });

    setProfilePicture(null);

    setPreview(
      user.profilePicture
        ? `${apiURL}/uploads/users/${user.profilePicture}`
        : "",
    );

    setIsEditing(false);
  };

  // Enregistrer les modifications
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);

    if (profilePicture) {
      data.append("profilePicture", profilePicture);
    }

    dispatch(editoneuser(user._id, data));
    setIsEditing(false);
  };

  // Affichage selon le rôle
  const getRoleInfo = () => {
    switch (user.role) {
      case "admin":
        return {
          title: "Administrateur",
          description: "Gestion et administration de la plateforme Tanit.",
          icon: "ri-shield-user-line",
        };

      case "artisan":
        return {
          title: "Artisan",
          description: "Gestion de votre espace artisan et de vos créations.",
          icon: "ri-store-2-line",
        };

      case "client":
        return {
          title: "Client",
          description: "Bienvenue dans votre espace personnel Tanit.",
          icon: "ri-user-line",
        };

      default:
        return {
          title: "Utilisateur",
          description: "Votre espace personnel.",
          icon: "ri-user-line",
        };
    }
  };

  if (!user?._id) {
    return <div className="profileLoading">Chargement des informations...</div>;
  }

  const roleInfo = getRoleInfo();

  return (
    <div className="profileContainer">
      {/* Header */}
      <div className="profilePageHeader">
        <div>
          <span className="profileSubtitle">
            {roleInfo.title.toUpperCase()}
          </span>

          <h1>Mon profil</h1>

          <p>{roleInfo.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Carte principale */}
        <div className="profileMainCard">
          <div className="profileAvatar">
            {preview ? (
              <img src={preview} alt={user.name} />
            ) : (
              <span>{user.name?.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <div className="profileMainInfo">
            <h2>{user.name}</h2>
            <p>{user.email}</p>

            <div className="profileBadges">
              <span className="profileRole">
                <i className={roleInfo.icon}></i>
                {roleInfo.title}
              </span>

              <span
                className={`profileStatus ${
                  user.isActive ? "active" : "inactive"
                }`}
              >
                {user.isActive ? "Compte actif" : "Compte inactif"}
              </span>
            </div>

            {isEditing && (
              <div className="profileImageInput">
                <label htmlFor="profilePicture">Changer la photo</label>

                <input
                  id="profilePicture"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="profileDetailsCard">
          <div className="profileCardHeader">
            <div>
              <h3>Informations personnelles</h3>
              <p>Gérez les informations de votre compte.</p>
            </div>

            <i className="ri-user-settings-line"></i>
          </div>

          <div className="profileDetailsGrid">
            <div className="profileDetailItem">
              <label htmlFor="name">Nom complet</label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="profileDetailItem">
              <label htmlFor="email">Adresse e-mail</label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
              />
            </div>

            <div className="profileDetailItem">
              <label htmlFor="phone">Téléphone</label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profileDetailItem">
              <label htmlFor="address">Adresse</label>

              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Informations selon le rôle */}
          <div className="profileRoleInfo">
            <span>Type de compte</span>
            <strong>{roleInfo.title}</strong>
          </div>

          {/* Actions */}
          <div className="profileActions">
            {!isEditing ? (
              <button
                type="button"
                className="profileEditBtn"
                onClick={() => setIsEditing(true)}
              >
                <i className="ri-edit-line"></i>
                Modifier mon profil
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="profileCancelBtn"
                  onClick={handleCancel}
                >
                  Annuler
                </button>

                <button type="submit" className="profileSaveBtn">
                  <i className="ri-save-line"></i>
                  Enregistrer
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
