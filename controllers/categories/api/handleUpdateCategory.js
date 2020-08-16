const _ = require('lodash');
const { updateSingleCategory } = require('../functions/createCategories');

const handleCreateCategory = async (req, res) => {
  const { body, params } = req;
  const categoryId = _.get(params, 'categoryId', null);

  try {
    const category = await updateSingleCategory(categoryId, body);
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleCreateCategory;
