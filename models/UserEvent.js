const { Model } = require('sequelize');

class UserEvent extends Model { }

module.exports = (sequelize, DataTypes) => {
  return UserEvent.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Event',
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
};
