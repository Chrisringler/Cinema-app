import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

const Register = ({ handleToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/register', { username, password });
      setUsername('');
      setPassword('');
      setError('');
      handleToggleForm();
      alert('Registro exitoso');
    } catch (error) {
      console.error(error);
      setError('Error al registrar el usuario');
    }
  };

  const handleClose = () => {
    handleToggleForm(); 
  };

  return (
    <div className="register-container">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <h2>Registro de usuario</h2>
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
        <button className='register-form' type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
