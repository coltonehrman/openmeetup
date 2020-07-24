const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const Group = require('./Group');
const Category = require('./Category');

class GroupCategory extends Model {}

GroupCategory.init({
  GroupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id'
    }
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, { sequelize });

module.exports = GroupCategory;
