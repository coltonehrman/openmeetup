const { UserGroup } = require('../../../models');

const userOwnsGroup = async (userId, groupId) => {
  // check valid userId and groupId
  if (!userId || !groupId || Number.isNaN(parseInt(userId)) || Number.isNaN(parseInt(groupId)))
    throw new Error('Invalid userId or groupId.');

  // find user group association
  const userGroup = await UserGroup.findOne({
    where: { userId, groupId }
  });

  // if association doesn't exist
  if (!userGroup) return false;

  return userGroup.isOwner;
};

module.exports = userOwnsGroup;
