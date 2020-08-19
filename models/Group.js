const { Model } = require('sequelize');
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

module.exports = (sequelize, DataTypes) => {
  return Group.init({
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
};
