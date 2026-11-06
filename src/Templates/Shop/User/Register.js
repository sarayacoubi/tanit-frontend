

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../../Redux/Actions/UsersActions";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handeleSubmit = (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    dispatch(register({ name, email, password }, navigate));
  };

  return (
    <div className="registerContainer container" onClick={() => navigate("/")}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="closeBtn"
          onClick={() => navigate("/")}
        >
          &times;
        </button>
        <h3>Bienvenu chez Tanit</h3> 
        <h2>Rejoigner notre univers.</h2>
        <h4>Des matières sincères, des gestes précieux et des découvertes à partager.</h4>

        <form onSubmit={handeleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nom</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              value={name}
              placeholder="Votre nom complet"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              value={email}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              value={password}
              placeholder="Mot de passe"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="verify-password">Confirmer le mot de passe</label>
            <input
              onChange={(e) => setVerifyPassword(e.target.value)}
              type="password"
              id="verify-password"
              value={verifyPassword}
              placeholder="Confirmez le mot de passe"
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
