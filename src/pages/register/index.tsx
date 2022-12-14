import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";

export const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setInputs((previous) => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <form className="login-form">
        <input
          required
          type="text"
          placeholder="Usuário"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Senha"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Cadastro</button>
        {error && <p>{error}</p>}
        <span>
          {" "}
          Já possui uma conta? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};
