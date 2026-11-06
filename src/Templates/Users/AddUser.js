import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProfessionalAccount } from "../../Redux/Actions/UsersActions";
import "./AddUser.css";

const AddUser = ({ onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("artisan");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const userData = {
      name,
      email,
      phone,
      address,
      role,
    };

    try {
      const success = await dispatch(createProfessionalAccount(userData));

      if (success) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-user-overlay">
      <div className="add-user-modal">
        <button
          type="button"
          className="close-modal"
          onClick={onClose}
          disabled={isSubmitting}
        >
          ×
        </button>

        <h2>Inviter un professionnel</h2>
        <p>Remplissez les informations pour envoyer une invitation.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom et prénom"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Adresse e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Numéro de téléphone"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Adresse"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Type de compte</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="artisan">Artisan</option>
              <option value="livreur">Livreur</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer l'invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
