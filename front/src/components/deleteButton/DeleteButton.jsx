import React from 'react';
import axios from 'axios';

function DeleteButton({ movieId, onMovieDeleted }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/movies/${movieId}`);
      onMovieDeleted(); 
    } catch (error) {
      console.error('Error al eliminarr la película', error);
    }
  };

  return (
    <button onClick={handleDelete}>Eliminar Película</button>
  );
}

export default DeleteButton;
