const { Group } = require('../../../models');
const userOwnsGroup = require('./userOwnsGroup');

const removeSingleGroup = async (userId, groupId) => {
  if (!userId || Number.isNaN(parseInt(userId))) throw new Error('Invalid User ID.');

  const group = await Group.findByPk(groupId);

  if (!group) throw new Error('Group does not exist.');

  const ownsGroup = await userOwnsGroup(userId, groupId);

  if (!ownsGroup) throw new Error('User does not own Group.');

  // remove all associations
  await Promise.all([
    group.setUsers([]),     // remove all user associations
    group.setEvents([]),    // remove all event associations
    group.setCategories([]) // remove all category associations
  ]);

  // delete group
  await group.destroy();

  return group;
};

module.exports = {
  removeSingleGroup
};
