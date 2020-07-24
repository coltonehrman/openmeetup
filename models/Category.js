const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Category extends Model {}

Category.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, { sequelize });

module.exports = Category;
