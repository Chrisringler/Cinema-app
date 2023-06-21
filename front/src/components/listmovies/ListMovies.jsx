import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './movies.css';

const obtenerPeliculas = async (searchTerm, currentPage, setPeliculas, setTotalPages) => {
  try {
    const response = await axios.get('https://cinema-app-production.up.railway.app/movies', {
      params: { title: searchTerm, page: currentPage, limit: 6 }
    });

    setPeliculas(response.data.movies);
    setTotalPages(Math.ceil(response.data.totalCount / 6));
  } catch (error) {
    console.error('Error al obtener las películas', error);
  }
};

function ListadoPeliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    obtenerPeliculas(searchTerm, currentPage, setPeliculas, setTotalPages);
  }, [searchTerm, currentPage]);

  const cambiarPagina = (newPage) => {
    setCurrentPage(newPage);
  };

  const buscarPeliculas = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  return (
    <div className="listado-peliculas-container">
      <h2 className="titulo-listado">Listado de Películas</h2>
      <div className="input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={buscarPeliculas}
          placeholder="Buscar películas"
          className="input-busqueda"
        />
      </div>
      <div className="listado-peliculas">
        <div className="peliculas-container">
          <table className="lista-peliculas">
            <tbody>
              {peliculas.map((pelicula) => (
                <tr key={pelicula.id}>
                  <td>
                    <Link to={`/movies/${pelicula.id}`}>
                      <div className="titulo-pelicula">{pelicula.title}</div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="botones-paginacion-container">
          <div className="botones-paginacion">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => cambiarPagina(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListadoPeliculas;
