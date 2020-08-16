const { Group, UserGroup } = require('../../../models');
const { createLocationPoint } = require('../../postgis');

const updateSingleGroup = async (userId, groupId, { title, description, location }) => {
  // find group
  const group = await Group.findByPk(groupId);

  // if not group found
  if (!group) throw new Error('Group does not exist.');

  // find user group
  const userGroup = await UserGroup.findOne({
    where: { userId, groupId }
  });

  // if no user group found
  if (!userGroup) throw new Error('User is not associated to Group.');

  // check that user owns groups
  if (!userGroup.isOwner) throw new Error('User does not own Group.');

  // update title
  if (typeof title !== 'undefined') group.setDataValue('title', title);

  // update description
  if (typeof description !== 'undefined') group.setDataValue('description', description);

  // update location
  if (typeof location !== 'undefined') {
    const newLocation = createLocationPoint(location);
    group.setDataValue('location', newLocation);
  }

  // save updates
  await group.save();

  return group;
};

module.exports = {
  updateSingleGroup
};
