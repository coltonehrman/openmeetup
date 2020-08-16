const _ = require('lodash');
const { removeSingleCategory } = require('../functions/removeCategories');

const handleRemoveCategory = async (req, res) => {
  const { params } = req;
  const categoryId = _.get(params, 'categoryId', null);

  try {
    const category = await removeSingleCategory(categoryId);
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleRemoveCategory;
