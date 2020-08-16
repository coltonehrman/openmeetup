const { Category } = require('../../../models');

const updateSingleCategory = async (categoryId, { title, description }) => {
  // find category
  const category = await Category.findByPk(categoryId);

  // if category does not exist
  if (!category) throw new Error('Category does not exist.');

  // update title
  if (typeof title !== 'undefined') category.setDataValue('title', title);

  // update description
  if (typeof description !== 'undefined') category.setDataValue('desription', description);

  // save category
  await category.save();

  return category;
};

module.exports = {
  updateSingleCategory
};
