import jwt from 'jsonwebtoken';

const secretKey = 'venturing';

export const generateToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: '1h' }; 
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log('Token JWT verificado:', decoded);
      return decoded.userId;
    } catch (error) {
      console.error('Error al verificar el token JWT', error);
      return null;
    }
  };
  
