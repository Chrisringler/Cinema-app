import { verifyToken } from './verifyToken.js'; 
export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  const userId = verifyToken(token); 

  if (!userId) {
    return res.status(401).json({ error: 'Token JWR inválido' })
  }

  req.userId = userId; 
  next();
};
