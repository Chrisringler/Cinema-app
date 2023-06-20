import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FormEdit.css"
function FormEdit({ pelicula, onMovieUpdated }) {
  const [editedFields, setEditedFields] = useState({
    title: pelicula.title || '',
    description: pelicula.description || '',
    year: pelicula.year || ''
  });

  useEffect(() => {
    setEditedFields({
      title: pelicula.title || '',
      description: pelicula.description || '',
      year: pelicula.year || ''
    });
  }, [pelicula]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleUpdateMovie = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3001/movies/${pelicula.id}`, editedFields);

      console.log(response.data); 

      onMovieUpdated({
        ...pelicula,
        ...editedFields
      });

      setEditedFields((prevFields) => ({
        ...prevFields,
        title: '',
        description: '',
        year: ''
      }));
    } catch (error) {
      console.error('Error al actualizar la película', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-overlay"></div>
      <div className="formulario-edicion">
        <form className="form-edit" onSubmit={handleUpdateMovie}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={editedFields.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              type="text"
              name="description"
              value={editedFields.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Año:</label>
            <input
              type="text"
              name="year"
              value={editedFields.year}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Actualizar Película</button>
        </form>
      </div>
    </div>
  );
  
}

export default FormEdit;
