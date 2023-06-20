import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
export const registerUser = (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Debes proporcionar el nombre de usuario y la contraseña' });
  }

  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  pool.query(checkUserQuery, [username], async (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos', error);
      return res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
      pool.query(insertUserQuery, [username, hashedPassword], (insertError) => {
        if (insertError) {
          return res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
        }
        
        res.json({ message: 'Usuario registrado exitosamente' });
      });
    } catch (hashError) {
      console.error('Error al hashear la contraseña', hashError);
      res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
  });
};
