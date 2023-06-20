import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from './verifyToken.js'; 

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Debes proporcionar el nombre de usuario y la contraseña' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  pool.query(query, [username], async (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos', error);
      return res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = generateToken(user.id); 

      return res.json({ token });
    } catch (hashError) {
      console.error('Error al comparar contraseñas', hashError);
      return res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
    }
  });
};
