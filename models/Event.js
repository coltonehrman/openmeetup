const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Event extends Model {}

Event.init({
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isRemote: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  location: DataTypes.GEOGRAPHY('POINT', 4326)
}, { sequelize });

module.exports = Event;
