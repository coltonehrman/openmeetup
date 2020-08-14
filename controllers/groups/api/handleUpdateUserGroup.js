const _ = require('lodash');
const updateUserGroup = require('../functions/updateUserGroup');

const handleUpdateUserGroup = async (req, res) => {
  const { session, params, query } = req;
  const groupId = _.get(params, 'groupId', null);
  const userId = parseInt(_.get(params, 'userId', null));
  const sessionUserId = parseInt(_.get(session, 'user.id', null));

  try {
    const result = await updateUserGroup(sessionUserId, userId, groupId, query);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleUpdateUserGroup;
