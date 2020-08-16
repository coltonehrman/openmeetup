const { Category } = require('../../../models');

const createSingleCategory = async ({ title, description }) => {
  // create category
  const category = await Category.create({
    title,
    description
  });

  return category;
};

module.exports = {
  createSingleCategory
};
