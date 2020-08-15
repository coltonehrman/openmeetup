const _ = require('lodash');
const { createSingleEvent } = require('../functions/createEvents');

const handleCreateEvent = async (req, res) => {
  const { body, session } = req;
  const sessionUserId = _.get(session, 'user.id', null);

  try {
    const event = await createSingleEvent(sessionUserId, body);
    return res.status(200).json(event);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleCreateEvent;
