const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Event = require('./Event');

class UserEvent extends Model {}

UserEvent.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    }
  },
  isParticipant: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isOrganizer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isCreator: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, { sequelize });

module.exports = UserEvent;
