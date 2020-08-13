const _ = require('lodash');
const { getAllGroups } = require('../functions/getGroups');

const handleGetAllGroups = async (req, res) => {
  const { session } = req;
  const sessionUserId = _.get(session, 'user.id', null);

  try {
    const groups = await getAllGroups(sessionUserId, {
      include: ['users', 'events', 'categories']
    });
    
    return res.status(200).json(groups);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleGetAllGroups;
