const { UserGroup } = require('../../../models');

const updateUserGroup = async (sessionUserId, userId, groupId, { isMember, isOwner }) => {
  let sessionUserGroup;
  let userGroup;

  if (sessionUserId !== userId) {
    // find user groups
    [sessionUserGroup, userGroup] = await Promise.all([
      UserGroup.findOne({ where: { groupId, userId: sessionUserId }}),
      UserGroup.findOne({ where: { groupId, userId }})
    ]);

    // throw error if session user group doesn't exist
    if (!sessionUserGroup) throw new Error('Session User Group association does not exist.');

    // throw error if session user is not owner of group
    if (!sessionUserGroup.isOwner) throw new Error('Session User is not Owner of group.');
  } else {
    // find user group only
    sessionUserGroup = userGroup = await UserGroup.findOne({ where: { groupId, userId }});
  }

  // throw error if user group doesn't exist
  if (!userGroup) throw new Error('User Group association does not exist.');

  // update user group isMember
  if (isMember === 'true' || isMember === 'false') userGroup.setDataValue('isMember', isMember === 'true');

  // update user group isOwner
  if (isOwner === 'true' || isOwner === 'false') {
    // if trying to update owner while not owner throw error
    if (!sessionUserGroup.isOwner) throw new Error('Session User is not Owner of group');
    
    userGroup.setDataValue('isOwner', isOwner === 'true');
  }

  const result = await userGroup.save();

  return result;
};

module.exports = updateUserGroup;
