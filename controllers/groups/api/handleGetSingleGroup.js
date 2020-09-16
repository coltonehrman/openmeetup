const _ = require('lodash');
const { getSingleGroup } = require('../functions/getGroups');

const handleGetSingleGroup = async (req, res) => {
  const { session, params } = req;
  const sessionUserId = _.get(session, 'user.id', null);
  const groupId = _.get(params, 'groupId', null);

  try {
    const group = await getSingleGroup(sessionUserId, groupId, {
      include: ['users', 'events', 'categories']
    });
    
    return res.status(200).json(group);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleGetSingleGroup;
