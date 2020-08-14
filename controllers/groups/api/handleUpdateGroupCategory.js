const _ = require('lodash');
const addCategory = require('../functions/addCategory');
const removeCategory = require('../functions/removeCategory');

const handleUpdateGroupCategory = (updateFn) => async (req, res) => {
  const { session, params } = req;
  const userId = _.get(session, 'user.id', null);
  const groupId = _.get(params, 'groupId', null);
  const categoryId = _.get(params, 'categoryId', null);

  try {
    const result = await updateFn(userId, groupId, categoryId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = {
  handleAddGroupCategory: handleUpdateGroupCategory(addCategory),
  handleRemoveGroupCategory: handleUpdateGroupCategory(removeCategory)
};
