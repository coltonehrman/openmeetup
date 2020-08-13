const { Group } = require('../../../models');

const getAllGroups = async (userId, { include }) => {
  const groups = await Group.findAll({ include });

  if (userId && !Number.isNaN(parseInt(userId))) {
    await Promise.all(groups.map(g => g.populateMe(userId)));
  }

  return groups;
};

module.exports = {
  getAllGroups
};
