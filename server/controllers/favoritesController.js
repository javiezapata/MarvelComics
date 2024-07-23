const Favorite = require('../models/Favorite');

// Agregar un comic a la lista de favoritos
const addFavorite = async (req, res) => {
  const { comicId } = req.params;
  const userId = req.userId; // Obtener userId del objeto req

  // Verificar si el comic ya está en la lista de favoritos del usuario
  const existingFavorite = await Favorite.findOne({
    where: { userId, comicId }
  });

  if (existingFavorite) {
    return res.status(400).json({ error: 'El comic ya está en la lista de favoritos' });
  }

  // Crear una nueva entrada en la tabla favorites
  try {
    await Favorite.create({ userId, comicId });
    res.status(201).json({ message: 'Comic agregado a la lista de favoritos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el comic a la lista de favoritos' });
  }
};

// Eliminar un comic de la lista de favoritos
const removeFavorite = async (req, res) => {
  const userId = req.userId;
  const { comicId } = req.params;
  
  // Eliminar la entrada correspondiente de la tabla favorites
  try {
    await Favorite.destroy({
      where: { userId, comicId }
    });
    res.status(200).json({ message: 'Comic eliminado de la lista de favoritos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el comic de la lista de favoritos' });
  }
};

// Obtener la lista de favoritos
const getFavorites = async (req, res) => {
  const userId = req.userId;
  
  // Obtener la lista de IDs de comics de la tabla favorites
  const favorites = await Favorite.findAll({
    where: { userId },
    attributes: ['comicId']
  });
  
  const comicIds = favorites.map(favorite => favorite.comicId); // Extraer IDs de comics
  res.status(200).json({ favorites: comicIds });
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites
};
