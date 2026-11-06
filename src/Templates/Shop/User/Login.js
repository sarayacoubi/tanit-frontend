import { useState } from "react";
import { login } from "../../../Redux/Actions/UsersActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>Se connecter</h2>
      <form action="#" method="POST">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="votre@email.com"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Votre mot de passe"
            required
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(login({ email, password }, navigate));
          }}
          type="submit"
          className="btn-submit"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
