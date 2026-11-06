

import "../../../Styles/Dashboard/Admin/Profile.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editoneuser } from "../../../Redux/Actions/UsersActions";

const ProfileAdmin = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const apiURL = process.env.REACT_APP_API_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(
    user?.profilePicture
      ? user.profilePicture.startsWith("http")
        ? user.profilePicture
        : `${apiURL}/${user.profilePicture}`
      : "",
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    role: user?.role || "",
    isActive: user?.isActive ?? true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Sélectionner une nouvelle photo
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image valide.");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      role: user?.role || "",
      isActive: user?.isActive ?? true,
    });

    setSelectedImage(null);
    setPreview(
      user?.profilePicture
        ? user.profilePicture.startsWith("http")
          ? user.profilePicture
          : `${apiURL}/${user.profilePicture}`
        : "",
    );

    setIsEditing(false);
  };

  // Enregistrer les modifications
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);

    if (selectedImage) {
      data.append("profilePicture", selectedImage);
    }

    try {
      await dispatch(editoneuser(user._id, data, navigate));
      onClose();
    } catch (error) {
      console.error("Erreur modification profil :", error);
    }
  };

  return (
    <div className="profileOverlay" onClick={onClose}>
      <div className="profileModal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="profileClose" onClick={onClose}>
          ×
        </button>

        {/* En-tête du profil */}
        <div className="profileHeader">
          <div className="profileImageContainer">
            <img
              src={preview || "/default-avatar.png"}
              alt=" profil de l'administarateur"
              className="profileAvatar"
            />

            {isEditing && (
              <label className="profileImageEdit">
                <i className="ri-camera-line"></i>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            )}
          </div>

          <div>
            <h2>{user?.name || "Administrateur"}</h2>
            <p>Administrateur</p>
          </div>
        </div>

        <form className="profileForm" onSubmit={handleSubmit}>
          <h3>Informations personnelles</h3>

          <label htmlFor="name">Nom complet</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            readOnly={!isEditing}
          />

          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />

          <label htmlFor="phone">Téléphone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            readOnly={!isEditing}
          />

          <label htmlFor="address">Adresse</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            readOnly={!isEditing}
          />

          <h3>Informations du compte</h3>

          <div className="profileInfo">
            <span>Rôle</span>
            <span>{formData.role}</span>
          </div>

          <div className="profileInfo">
            <span>Statut</span>
            <span>{user?.isActive ? "Actif" : "Désactivé"}</span>
          </div>

          <div className="profileInfo">
            <span>Date de création</span>
            <span>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("fr-FR")
                : "Non disponible"}
            </span>
          </div>

          <div className="profileActions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="profileCancel"
                  onClick={handleCancel}
                >
                  Annuler
                </button>

                <button type="submit" className="profileSave">
                  Enregistrer
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="profileCancel"
                  onClick={onClose}
                >
                  Fermer
                </button>

                <button
                  type="button"
                  className="profileSave"
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileAdmin;
