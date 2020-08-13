const _ = require('lodash');
const { createSingleGroup } = require('../functions/createGroups');

const handleCreateGroup = async (req, res) => {
  const { body, session } = req;
  const sessionUserId = _.get(session, 'user.id', null);

  try {
    const group = await createSingleGroup(sessionUserId, body);
    return res.status(200).json(group);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleCreateGroup;
