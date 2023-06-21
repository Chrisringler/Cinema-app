import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Register from '../register/Register';
import './login.css';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://cinema-app-production.up.railway.app/login', { username, password });
      const authToken = response.data.token;
      setUsername('');
      setPassword('');
      setError('');
      console.log('Inicio de sesión exitoso');
      console.log('Token de autenticación:', authToken);

      localStorage.setItem('authToken', authToken);

      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de usuario:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className='login' type="submit">Iniciar sesión</button>
      </form>
      {!showRegister && (
        <button className="register" onClick={handleRegisterClick}>
          Registrarse
        </button>
      )}
      {showRegister && (
        <div className="overlay">
          <div className="shadow-bg">
            <Register handleToggleForm={handleRegisterSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
