const express = require('express');
const cors = require('cors')
const sequelize = require('./config/database');
const User = require('./models/Users');
const Favorite = require('./models/Favorite');
const { Op } = require('sequelize'); // Importamos el operador Op para consultas
const bcrypt = require('bcrypt'); // Importamos bcrypt para hash de contraseñas
const jwt = require('jsonwebtoken'); // Importamos jsonwebtoken para JWT
const dotenv = require('dotenv'); // Importamos dotenv para variables de entorno
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:4200' // Permite solicitudes desde http://localhost:4200
}));

app.use(bodyParser.json()); // Para procesar JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Sincronización de modelos con la base de datos
(async () => {
  await User.sync();
  await Favorite.sync();
  console.log('Modelos sincronizados con la base de datos');
})();

// Importamos los controladores
const authController = require('./controllers/authController');
const favoritesController = require('./controllers/favoritesController');

// Definimos el middleware para verificar token JWT
const verifyToken = require('./middlewares/verifyToken');

// Ruta de registro de usuario
app.post('/register', authController.register);

// Ruta de inicio de sesión
app.post('/login', authController.login);

// Ruta para agregar un comic a la lista de favoritos (protegida con JWT)
app.post('/favorites/:comicId', verifyToken, favoritesController.addFavorite);

// Ruta para eliminar un comic de la lista de favoritos (protegida con JWT)
app.delete('/favorites/:comicId', verifyToken, favoritesController.removeFavorite);

// Ruta para obtener la lista de favoritos (protegida con JWT)
app.get('/favorites', verifyToken, favoritesController.getFavorites);

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
