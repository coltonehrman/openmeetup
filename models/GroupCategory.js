const { Model } = require('sequelize');

class GroupCategory extends Model { }

module.exports = (sequelize, DataTypes) => {
  return GroupCategory.init({
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Group',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, { sequelize });
};
