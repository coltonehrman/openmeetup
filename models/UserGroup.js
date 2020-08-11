const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Group = require('./Group');

class UserGroup extends Model {}

UserGroup.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id'
    }
  },
  isMember: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isOwner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isCreator: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, { sequelize });

module.exports = UserGroup;
