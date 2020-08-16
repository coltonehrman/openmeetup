const { Category } = require('../../../models');

const removeSingleCategory = async (categoryId) => {
  // find category
  const category = await Category.findByPk(categoryId);

  // if category does not exist
  if (!category) throw new Error('Category does not exist.');

  // destroy category
  await category.destroy();

  return category;
};

module.exports = {
  removeSingleCategory
};
