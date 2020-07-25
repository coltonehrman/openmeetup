const User = require('./User');
const Group = require('./Group');
const UserGroup = require('./UserGroup');
const Event = require('./Event');
const Category = require('./Category');
const EventCategory = require('./EventCategory');
const GroupCategory = require('./GroupCategory');

User.hasMany(Event, { as: 'createdEvents', foreignKey: 'creatorId' });
Event.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });

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
  UserGroup,
  Event,
  Category,
  EventCategory
};
