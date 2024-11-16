import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';

function Login() {
    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      try {
        const response = await api.post("auth/login", { email, password });
        const { token } = response.data;
  
        localStorage.setItem("token", token);
        
        login();

        navigate('/dashboard');

      } catch (err) {
        setError(err.response?.data?.message || "Erro ao realizar login.");
      }
    };
    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <p>Usuário autenticado? {isAuthenticated ? "Sim" : "Não"}</p>
            <form onSubmit={handleSubmit}>
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Entrar</button>
            </form>

            <Button onClick={() => navigate("/register")}>Cadastre-se</Button>

        </div>
    );
}

export default Login;
