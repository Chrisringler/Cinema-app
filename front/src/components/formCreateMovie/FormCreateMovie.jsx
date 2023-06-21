import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormCreateMovie.css';

function FormCreateMovie() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'year') {
      setYear(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://cinema-app-production.up.railway.app/movies', {
        title,
        description,
        year
      });

      console.log(response.data);

      setTitle('');
      setDescription('');
      setYear('');

      alert('Película creada exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al crear la película', error);
    }
  };

  return (
    <div className="form-create-movie-container">
      <h2 className="form-create-movie-title">Agregar Película</h2>
      <form className="form-create-movie" onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Año:</label>
          <input
            type="text"
            name="year"
            value={year}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Crear Película</button>
      </form>
    </div>
  );
}

export default FormCreateMovie;
