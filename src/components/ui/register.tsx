import React, { useState } from "react";
import api from "@/services/api";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("auth/register", { name, email, password });
      setMessage(response.data.message || "Registrado com sucesso!");

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMessage(error.response?.data.message || "Erro ao registrar.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registrar</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
