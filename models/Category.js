const { Model } = require('sequelize');

class Category extends Model { }

module.exports = (sequelize, DataTypes) => {
  return Category.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, { sequelize });
};
