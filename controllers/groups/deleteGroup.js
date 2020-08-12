const { Group } = require('../../models');

const deleteGroup = async (req, res) => {
  const { params } = req;
  const { id: groupId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // remove all associations
    await Promise.all([
      group.setUsers([]),     // remove all user associations
      group.setEvents([]),    // remove all event associations
      group.setCategories([]) // remove all category associations
    ]);

    // delete group
    await group.destroy();

    res.status(200).json(group);
  } catch (err) {
    const { message } = err;
    console.error(message);
    res.status(500).json(message);
  }
};

module.exports = deleteGroup;
