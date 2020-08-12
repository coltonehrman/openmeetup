const { Group } = require('../../models');

const leaveGroup = async (req, res) => {
  const { session, params } = req;
  const { user: { id: userId } } = session;
  const { id: groupId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // remove user from group
    const result = await group.removeUser(userId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

module.exports = leaveGroup;
