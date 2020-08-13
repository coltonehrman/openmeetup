const { UserGroup } = require('../../models');

const changeUserGroupStatus = (status, newValue) => async (req, res) => {
  const { session, params } = req;
  const { user: { id: userId } } = session;
  const { id: groupId } = params;

  try {
    // find user group
    const userGroup = await UserGroup.findOne({
      where: { groupId, userId }
    });

    // throw error if user group doesn't exist
    if (!userGroup) throw new Error('User Group association does not exist.');

    // set user group status
    userGroup.setDataValue(status, newValue);
    const result = await userGroup.save();

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

module.exports = changeUserGroupStatus;
