import { useState, useContext } from "react";
import { signup } from "../api/authApi";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";


const Signup = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    login(res.data);
    navigate("/onboarding"); // 👈 immediately start onboarding
  };

  return (
    <div className="auth-container">
      <h2>Create your account</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
        />
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

        <button type="submit" className="btn-primary">
          Get Started
        </button>
      </form>

      <button className="btn-secondary" style={{ marginTop: "12px" }}>
        Sign up with Google (optional)
      </button>
    </div>
  );
};

export default Signup;
