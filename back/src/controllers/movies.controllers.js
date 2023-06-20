import {pool} from "../db.js"
import fs from 'fs';
import csv from 'fast-csv';


//////////////////////////////CONSULTA DE PELICULAS //////////////////////////////
export const getListMovies = (req, res) => {
    const { title, page, limit } = req.query;
    const offset = (page - 1) * limit;
  
    let query = 'SELECT * FROM movies';
  
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`
    }
  
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error al consultar la base de datos', error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener las películas' });
      }
  
      pool.query('SELECT COUNT(*) AS totalCount FROM movies', (countError, countResults) => {
        if (countError) {
          console.error('Error al obtener el total de películas', countError);
          return res.status(500).json({ error: 'Ocurrió un error al obtener las películas' });
        }
  
        const totalCount = countResults[0].totalCount;
  
        return res.json({ movies: results, totalCount });
      });
    });
  };

//////////////////////////////SUBIR PELICULAS//////////////////////////////
export const createListMovie = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha proporcionado un archivo CSV' });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ delimiter: ';' }))
    .on('data', (row) => {
      results.push(row);
    })
    .on('error', (error) => {
      console.error('Error al leer el archivo CSV:', error);
      return res.status(500).json({ error: 'Error al leer el archivo CSV' });
    })
    .on('end', () => {
      const insertQuery = 'INSERT INTO movies (title, description, year) VALUES (?, ?, ?)';

      results.forEach((row) => {
        const title = row[0];
        const description = row[1];
        const year = row[2];

        console.log('Insertando película:', title, description, year);

        if (title) {
          pool.query(insertQuery, [title, description, year], (error) => {
            if (error) {
              console.error('Error al insertar una película en la base de datos:', error);
            }
          });
        } else {
          console.warn('El título de una película es nulo. La pelicula no será insertada.');
        }
      });

      return res.json({ message: 'Películas importadas con éxitoo' });
    });
};



//////////////////////////////CREAR PELICULA//////////////////////////////


  export const createMovie = (req, res) => {
    const { title, description, year } = req.body;
  
    pool.query(
      'INSERT INTO movies (title, description, year) VALUES (?, ?, ?)',
      [title, description, year],
      (error, results) => {
        if (error) {
          console.error('Error al insertar una película en la base de datos', error);
          return res.status(500).json({ error: 'Ocurrió un error al crear la película' });
        }
  
        return res.json({ message: 'Película creada exitosamente' });
      }
    );
  };

  //////////////////////////////DETALLE//////////////////////////////

  
  export const getMovie = (req, res) => {
    const movieId = req.params.id;
  
    pool.query(
      'SELECT * FROM movies WHERE id = ?',
      [movieId],
      (error, results) => {
        if (error) {
          console.error('Error al consultar la base de datos', error);
          return res.status(500).json({ error: 'Ocurrió un error al obtener la película' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ error: 'Película no encontrada' });
        }
  
        const movie = results[0];
  
        return res.json({ movie });
      }
    );
  };
  
  //////////////////////////////ACTUALIZAR PELICULA//////////////////////////////

export const updateMovie = (req, res) => {
  const movieId = req.params.id;
  const updateFields = {};
  
  if (req.body.title) {
    updateFields.title = req.body.title;
  }
  
  if (req.body.description) {
    updateFields.description = req.body.description;
  }
  
  if (req.body.year) {
    updateFields.year = req.body.year;
  }
  
  pool.query(
    'UPDATE movies SET ? WHERE id = ?',
    [updateFields, movieId],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar la película en la base de datos', error);
        return res.status(500).json({ error: 'Ocurrió un error al actualizar la película' });
      }

      return res.json({ message: 'Película actualizada exitosamente' });
    }
  );
};

  
  //////////////////////////////ELIMINAR PELICULA//////////////////////////////

  export const deleteMovie = (req, res) => {
    const movieId = req.params.id;
  
    pool.query(
      'DELETE FROM movies WHERE id = ?',
      [movieId],
      (error, results) => {
        if (error) {
          console.error('Error al eliminar la película de la base de datos', error);
          return res.status(500).json({ error: 'Ocurrió un error al eliminar la película' });
        }
  
        return res.json({ message: 'Película eliminada exitosamente' });
      }
    );
  };
  