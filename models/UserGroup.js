const { Model } = require('sequelize');

class UserGroup extends Model { }

module.exports = (sequelize, DataTypes) => {
  return UserGroup.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Group',
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
};
