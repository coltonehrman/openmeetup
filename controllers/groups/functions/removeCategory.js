const { Group, Category } = require('../../../models');
const userOwnsGroup = require('./userOwnsGroup');

const removeCategory = async (userId, groupId, categoryId) => {
  if (!groupId || !categoryId) throw new Error('Missing groupId or categoryId.');
  
  // find group and category
  const [group, category] = await Promise.all([
    Group.findByPk(groupId),
    Category.findByPk(categoryId)
  ]);

  // if group doesn't exist
  if (!group) throw new Error('Group does not exist.');

  // if category doesn't exist
  if (!category) throw new Error('Category does not exist.');

  const ownsGroup = await userOwnsGroup(userId, groupId);

  if (!ownsGroup) throw new Error('User does not own Group.');

  // add category to group
  const result = await group.removeCategory(categoryId);
  
  return result;
};

module.exports = removeCategory;
