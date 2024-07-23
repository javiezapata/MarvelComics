const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const verifyToken = async (req, res, next) => {
  // Extraer el token JWT de la cabecera de la petición
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'No se ha proporcionado un token JWT' });
  }

  // El token debe estar en el formato "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Formato del token JWT inválido' });
  }

  try {
    // Verificar la validez del token usando jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Añadir el ID del usuario a la petición para que sea accesible en los controladores
    req.userId = userId;

    // Buscar el usuario en la base de datos
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Si el token es válido, continuar con la siguiente ruta o controlador
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token JWT inválido' });
  }
};

module.exports = verifyToken;
