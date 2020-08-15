const _ = require('lodash');
const { removeSingleGroupEvent } = require('../functions/removeGroupEvents');

const handleRemoveGroupEvent = async (req, res) => {
  const { session, params } = req;
  const sessionUserId = _.get(session, 'user.id', null);
  const groupId = _.get(params, 'groupId', null);
  const eventId = _.get(params, 'eventId', null);

  try {
    const event = await removeSingleGroupEvent(sessionUserId, groupId, eventId);
    return res.status(200).json(event);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleRemoveGroupEvent;
