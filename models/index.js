const User = require('./User');
const Group = require('./Group');
const Event = require('./Event');
const Category = require('./Category');
const UserGroup = require('./UserGroup');
const UserEvent = require('./UserEvent');
const GroupCategory = require('./GroupCategory');
const EventCategory = require('./EventCategory');

User.belongsToMany(Event, { as: 'events', foreignKey: 'userId', otherKey: 'eventId', through: UserEvent });
Event.belongsToMany(User, { as: 'members', foreignKey: 'eventId', otherKey: 'userId', through: UserEvent });

User.belongsToMany(Group, { as: 'groups', foreignKey: 'userId', otherKey: 'groupId', through: UserGroup });
Group.belongsToMany(User, { as: 'members', foreignKey: 'groupId', otherKey: 'userId', through: UserGroup });

Group.hasMany(Event, { as: 'events' });
Event.belongsTo(Group, { as: 'group' });

Category.belongsToMany(Event, { as: 'events', foreignKey: 'categoryId', otherKey: 'eventId', through: EventCategory });
Event.belongsToMany(Category, { as: 'categories', foreignKey: 'eventId', otherKey: 'categoryId', through: EventCategory });

Category.belongsToMany(Group, { as: 'groups', foreignKey: 'categoryId', otherKey: 'groupId', through: GroupCategory });
Group.belongsToMany(Category, { as: 'categories', foreignKey: 'groupId', otherKey: 'categoryId', through: GroupCategory });

module.exports = {
  User,
  Group,
  Event,
  Category,
  UserGroup,
  UserEvent,
  GroupCategory,
  EventCategory
};
