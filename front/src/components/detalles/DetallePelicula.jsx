import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DetallePelicula.css';
import FormEdit from '../formEdit/FormEdit';
import DeleteButton from '../deleteButton/DeleteButton';

function DetallePelicula() {
  const [pelicula, setPelicula] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleMovieUpdated = (updatedMovie) => {
    setPelicula(updatedMovie);
    setEditMode(false);
    console.log(updatedMovie);
  };

  const handleMovieDeleted = () => {
    console.log('Película eliminada');
    navigate('/');
  };

  const handleEditarClick = () => {
    setEditMode(true);
  };

  const handleCancelarClick = () => {
    setEditMode(false);
  };

  useEffect(() => {
    const obtenerPelicula = async () => {
      try {
        const response = await axios.get(`https://cinema-app-production.up.railway.app/movies/${id}`);
        setPelicula(response.data.movie);
      } catch (error) {
        console.error('Error al obtener la película', error);
      }
    };

    obtenerPelicula();
  }, [id]);

  if (!pelicula) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalle-pelicula">
      <h2>{pelicula.title}</h2>
      <p className="descripcion">{pelicula.description}</p>
      <p>{pelicula.year}</p>
      <div className="botones">
  {!editMode && (
    <button className="editar-button" onClick={handleEditarClick}>
      Editar
    </button>
  )}
  {editMode && (
    <div className="modal">
      <div className="formulario-edicion">
        <h3>Editar Película</h3>
        <FormEdit pelicula={pelicula} onMovieUpdated={handleMovieUpdated} onCancel={handleCancelarClick} />
      </div>
      <div className="modal-overlay" onClick={handleCancelarClick}></div>
    </div>
  )}
  {pelicula && (
    <DeleteButton movieId={pelicula.id} onMovieDeleted={handleMovieDeleted} />
  )}
</div>
</div>
  );
}

export default DetallePelicula;

