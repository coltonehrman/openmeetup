const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const _ = require('lodash');

class Group extends Model {
  async populateMe(id) {
    if (!id) return;
    
    const [me] = await this.getUsers({
      through: {
        where: { userId: id }
      }
    });

    this.me = _.get(me, 'UserGroup.dataValues', null);
    return me;
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
  location: DataTypes.GEOGRAPHY('POINT', 4326),
  me: DataTypes.VIRTUAL
}, { sequelize });

module.exports = Group;
