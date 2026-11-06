// import { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./activateaccount.css";

// const ActivateAccount = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const token = searchParams.get("token");
//   const email = searchParams.get("email");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!token || !email) {
//       setError("Le lien d'activation est invalide.");
//       return;
//     }

//     if (password.length < 8) {
//       setError("Le mot de passe doit contenir au moins 8 caractères.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Les deux mots de passe ne correspondent pas.");
//       return;
//     }

//     try {
//       setLoading(true);

//      await axios.post("/api/user/ActivateAccount", {
//         token,
//         email,
//         password,
//       });

//       setSuccess(true);
//     } catch (err) {
//       console.error("Erreur activation :", err);

//       const message =
//         err.response?.data?.errors?.[0]?.msg ||
//         err.response?.data?.msg ||
//         "Impossible d'activer votre compte. Vérifiez votre lien.";

//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="activate-page">
//       <div className="activate-card">
//         {!success ? (
//           <>
//             <div className="activate-icon">🔐</div>

//             <h2>Activer votre compte</h2>

//             <p className="activate-description">
//               Bienvenue sur Tanit ! Choisissez votre mot de passe
//               pour finaliser l'activation de votre compte.
//             </p>

//             <div className="activate-email">
//               {email || "Adresse e-mail non disponible"}
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="activate-form-group">
//                 <label>Nouveau mot de passe</label>
//                 <input
//                   type="password"
//                   placeholder="Minimum 8 caractères"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="activate-form-group">
//                 <label>Confirmer le mot de passe</label>
//                 <input
//                   type="password"
//                   placeholder="Confirmez votre mot de passe"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               {error && (
//                 <p className="activate-error">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 className="activate-btn"
//                 disabled={loading || !token || !email}
//               >
//                 {loading ? "Activation en cours..." : "Activer mon compte"}
//               </button>
//             </form>
//           </>
//         ) : (
//           <div className="activate-success">
//             <div className="success-icon">✓</div>

//             <h2>Compte activé !</h2>

//             <p>
//               Votre compte Tanit est maintenant actif.
//               Vous pouvez vous connecter avec votre nouveau mot de passe.
//             </p>

//             <button
//               className="activate-btn"
//               onClick={() => navigate("/Login")}
//             >
//               Se connecter
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActivateAccount;
