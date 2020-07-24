const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const Event = require('./Event');
const Category = require('./Category');

class EventCategory extends Model {}

EventCategory.init({
  EventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
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

module.exports = EventCategory;
