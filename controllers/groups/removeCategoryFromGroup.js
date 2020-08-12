const { Group } = require('../../models');

const removeCategoryFromGroup = async (req, res) => {
  const { params } = req;
  const { groupId, categoryId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // remove category from group
    const result = await group.removeCategory(categoryId);
    
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

module.exports = removeCategoryFromGroup;
