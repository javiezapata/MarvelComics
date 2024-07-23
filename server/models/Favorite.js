const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');

const Favorite = sequelize.define('favorite', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  comicId: {
    type: DataTypes.INTEGER
  },
  primaryKey: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

module.exports = Favorite;
