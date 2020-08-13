const { Group } = require('../../../models');

const removeCategory = async (groupId, categoryId) => {
  if (!groupId || !categoryId) throw new Error('Missing groupId or categoryId.');
  
  // find group
  const group = await Group.findByPk(groupId);

  // if group doesn't exist
  if (!group) throw new Error('Group does not exist.');

  // add category to group
  const result = await group.removeCategory(categoryId);
  
  return result;
};

module.exports = removeCategory;
