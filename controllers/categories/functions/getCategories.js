const { Category } = require('../../../models');

const getAllCategories = async ({ include }) => {
  const categories = await Category.findAll({ include });
  return categories;
};

module.exports = {
  getAllCategories
};
