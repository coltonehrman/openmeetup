const _ = require('lodash');
const { createSingleGroupEvent } = require('../functions/createGroupEvents');

const handleCreateGroupEvent = async (req, res) => {
  const { session, params, body } = req;
  const sessionUserId = _.get(session, 'user.id', null);
  const groupId = _.get(params, 'groupId', null);

  try {
    const event = await createSingleGroupEvent(sessionUserId, groupId, body);
    return res.status(200).json(event);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleCreateGroupEvent;
