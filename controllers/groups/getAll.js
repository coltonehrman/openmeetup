const { Group } = require('../../models');
const _ = require('lodash');

const getAll = async (req, res) => {
  const me = _.get(req.session, 'user.id', null);

  // find all groups
  const groups = await Group.findAll({
    include: ['users', 'events', 'categories']
  });

  await Promise.all(groups.map(g => g.populateMe(me)));

  res.status(200).json(groups);
};

module.exports = getAll;
