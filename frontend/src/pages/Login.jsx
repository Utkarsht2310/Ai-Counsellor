import { useState, useContext } from "react";
import { login as loginApi } from "../api/authApi";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginApi(form);
    login(res.data);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <h2>Welcome back</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="btn-primary">Login</button>
      </form>

      <p
        style={{ marginTop: "12px", cursor: "pointer", color: "#a5b4fc" }}
        onClick={() => navigate("/forgot-password")}
      >
        Forgot password?
      </p>
    </div>
  );
};

export default Login;
