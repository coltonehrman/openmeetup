const _ = require('lodash');
const { removeSingleGroup } = require('../functions/removeGroups');

const handleRemoveGroup = async (req, res) => {
  const { params, session } = req;
  const sessionUserId = _.get(session, 'user.id', null);
  const groupId = _.get(params, 'groupId', null);

  try {
    const removedGroup = await removeSingleGroup(sessionUserId, groupId);
    return res.status(200).json(removedGroup);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleRemoveGroup;
