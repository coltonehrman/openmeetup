const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User.belongsToMany(db.Group, { as: 'groups', foreignKey: 'userId', otherKey: 'groupId', through: db.UserGroup });
db.Group.belongsToMany(db.User, { as: 'users', foreignKey: 'groupId', otherKey: 'userId', through: db.UserGroup });

db.User.belongsToMany(db.Event, { as: 'events', foreignKey: 'userId', otherKey: 'eventId', through: db.UserEvent });
db.Event.belongsToMany(db.User, { as: 'users', foreignKey: 'eventId', otherKey: 'userId', through: db.UserEvent });

db.Group.hasMany(db.Event, { as: 'events', foreignKey: 'groupId' });
db.Event.belongsTo(db.Group, { as: 'group', foreignKey: 'groupId' });

db.Category.belongsToMany(db.Group, { as: 'groups', foreignKey: 'categoryId', otherKey: 'groupId', through: db.GroupCategory });
db.Group.belongsToMany(db.Category, { as: 'categories', foreignKey: 'groupId', otherKey: 'categoryId', through: db.GroupCategory });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
