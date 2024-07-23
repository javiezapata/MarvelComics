const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { identificacion, username, email, password } = req.body;

  // Validación de datos
  if (!identificacion || !username || !email || !password) {
    return res.status(400).json({ error: 'Se requieren todos los campos: identificacion, username, email y password' });
  }

  if (username.length < 6 || username.length > 255) {
    return res.status(400).json({ error: 'El nombre de usuario debe tener entre 6 y 255 caracteres' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'El formato de correo electrónico no es válido' });
  }

  // Verificar si el email ya está en uso
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
  }

  // Generar hash de contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  try {
    const newUser = await User.create({
      identificacion,
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Función auxiliar para validar el formato de correo electrónico
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/i;
  return re.test(email);
}

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validación de datos
  if (!email || !password) {
    return res.status(400).json({ error: 'Se requieren todos los campos: email y password' });
  }

  // Buscar usuario por email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }

  // Verificar contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }

  // Generar token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.status(200).json({
    message: 'Inicio de sesión exitoso',
    token
  });
};

module.exports = {
  register,
  login
};
