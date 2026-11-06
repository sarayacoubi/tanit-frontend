import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getOneUser, editoneuser } from "../../Redux/Actions/UsersActions";

import "./userdetails.css";
import Loading from "../Feedback/Loading";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.UsersReducer.selectedUser);

  const [isEditing, setIsEditing] = useState(
    searchParams.get("edit") === "true",
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isActive, setIsActive] = useState(true);

  // Récupérer l'utilisateur
  useEffect(() => {
    dispatch(getOneUser(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  // Synchroniser le mode édition avec l'URL
  useEffect(() => {
    setIsEditing(searchParams.get("edit") === "true");
  }, [searchParams]);

  // Récupérer les données de l'utilisateur
  useEffect(() => {
    if (user && user._id === id) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setIsActive(user.isActive ?? true);
      setProfilePicture(null);
    }
  }, [user, id]);

  // Annuler la modification
  const handleCancel = () => {
    setName(user.name || "");
    setEmail(user.email || "");
    setRole(user.role || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
    setIsActive(user.isActive ?? true);
    setProfilePicture(null);
    setIsEditing(false);
    navigate(`/Dashboard/getUser/${id}`);
  };

  // Modifier l'utilisateur
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("isActive", String(isActive));

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    dispatch(editoneuser(id, formData, navigate));
  };

  // if (!user || user._id !== id) {
  //   return <p>Chargement de l'utilisateur...</p>;
  // }

  const imagePreview = profilePicture
    ? URL.createObjectURL(profilePicture)
    : user.profilePicture
      ? `http://localhost:5000/uploads/users/${user.profilePicture}`
      : "/images/user.jpg";

  if (loading) {
    return <Loading show={loading} />;
  }

  return (
    <div className="voirUser">
      <div className="userDetailsHeader">
        <div>
          <h2>Détails de l'utilisateur</h2>
          <p>Consulter et gérer les informations du compte.</p>
        </div>

        <div className="userHeaderActions">
          <button
            type="button"
            className="backUsersBtn"
            onClick={() => navigate("/Dashboard/Users")}
          >
            <i className="ri-arrow-left-line"></i>
            Retour à la liste
          </button>

          {isEditing ? (
            <button type="button" onClick={handleCancel}>
              Annuler
            </button>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)}>
              Modifier
            </button>
          )}
        </div>
      </div>

      <div className="userDetails">
        <div className="userPhotoContainer">
          <img src={imagePreview} alt=" de profil" className="userPhoto" />
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="userEditForm">
            <div className="formGroup">
              <label htmlFor="name">Nom :</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email :</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="role">Rôle :</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="admin">Admin</option>
                <option value="artisan">Artisan</option>
                <option value="client">Client</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="phone">Téléphone :</label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="address">Adresse :</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="isActive">Statut du compte :</label>
              <select
                id="isActive"
                value={String(isActive)}
                onChange={(e) => setIsActive(e.target.value === "true")}
              >
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="profilePicture">Nouvelle photo :</label>
              <input
                id="profilePicture"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setProfilePicture(e.target.files[0] || null)}
              />
            </div>

            <button type="submit" className="saveUserBtn">
              Enregistrer les modifications
            </button>
          </form>
        ) : (
          <div className="userInfo">
            <p>
              <strong>Nom :</strong> {user.name}
            </p>

            <p>
              <strong>Email :</strong> {user.email}
            </p>

            <p>
              <strong>Rôle :</strong> {user.role}
            </p>

            <p>
              <strong>Téléphone :</strong> {user.phone || "Non renseigné"}
            </p>

            <p>
              <strong>Adresse :</strong> {user.address || "Non renseignée"}
            </p>

            <p>
              <strong>Statut du compte :</strong>
              <span
                className={user.isActive ? "statusActive" : "statusInactive"}
              >
                {user.isActive ? "Actif" : "Inactif"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
