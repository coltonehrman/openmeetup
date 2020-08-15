const _ = require('lodash');
const { updateSingleGroup } = require('../functions/updateGroups');

const handleUpdateGroup = async (req, res) => {
  const { session, params, body } = req;
  const sessionUserId = _.get(session, 'user.id', null);
  const groupId = _.get(params, 'groupId', null);

  try {
    const group = await updateSingleGroup(sessionUserId, groupId, body);
    return res.status(200).json(group);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleUpdateGroup;
