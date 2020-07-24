const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Group = require('./Group');

class UserGroup extends Model {}

UserGroup.init({
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  GroupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id'
    }
  },
  isOrganizer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, { sequelize });

module.exports = UserGroup;
