const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Group extends Model {
  async getOrganizers() {
    const members = await this.getMembers();
    return members.filter(({ UserGroup: { isOrganizer } }) => isOrganizer);
  }
}

Group.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: DataTypes.GEOGRAPHY('POINT', 4326)
}, { sequelize });

module.exports = Group;
