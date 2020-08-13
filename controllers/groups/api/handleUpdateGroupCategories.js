const _ = require('lodash');
const addCategory = require('../functions/addCategory');
const removeCategory = require('../functions/removeCategory');

const ACTIONS = {
  ADD: addCategory,
  REMOVE: removeCategory
};

const handleUpdateGroupCategories = async (req, res) => {
  const { params, query } = req;
  const action = ACTIONS[_.get(query, 'action', ACTIONS.ADD)];
  const groupId = _.get(params, 'groupId', null);
  const categoryId = _.get(query, 'categoryId', null);

  // if no categoryId present in request
  if (!categoryId) return res.status(500).json('No categoryId.');

  // if invalid action in request
  if (!action) return res.status(500).json('Invalid action type.');

  try {
    const result = await action(groupId, categoryId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleUpdateGroupCategories;
