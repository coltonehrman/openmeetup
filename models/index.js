const User = require('./User');
const Group = require('./Group');
const UserGroup = require('./UserGroup');
const Event = require('./Event');
const Category = require('./Category');
const EventCategory = require('./EventCategory');
const GroupCategory = require('./GroupCategory');

User.hasMany(Group, { as: 'ownedGroups', foreignKey: 'ownerId' });
Group.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

User.hasMany(Event, { as: 'createdEvented', foreignKey: 'creatorId' });
Event.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });

User.belongsToMany(Group, { as: 'groups', through: UserGroup });
Group.belongsToMany(User, { as: 'members', through: UserGroup });

Group.hasMany(Event, { as: 'events' });
Event.belongsTo(Group, { as: 'group' });

Category.belongsToMany(Event, { as: 'events', through: EventCategory });
Event.belongsToMany(Category, { as: 'categories', through: EventCategory });

Category.belongsToMany(Group, { as: 'groups', through: GroupCategory });
Group.belongsToMany(Category, { as: 'categories', through: GroupCategory });

module.exports = {
  User,
  Group,
  UserGroup,
  Event,
  Category,
  EventCategory
};
