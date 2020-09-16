const { Group } = require('../../../models');

const getSingleGroup = async (userId, groupId, { include }) => {
  console.log(userId, groupId);
  const group = await Group.findByPk(groupId, { include });

  if (userId && !Number.isNaN(parseInt(userId))) {
    await group.populateMe(userId);
  }

  return group;
};

const getAllGroups = async (userId, { include }) => {
  const groups = await Group.findAll({ include });

  if (userId && !Number.isNaN(parseInt(userId))) {
    await Promise.all(groups.map(g => g.populateMe(userId)));
  }

  return groups;
};

module.exports = {
  getSingleGroup,
  getAllGroups
};
