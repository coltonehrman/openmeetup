const { Category } = require('../../../models');

const createSingleCategory = async ({ title, description }) => {
  if (!title || title.trim().length === 0) throw new Error('Must provide title.');
  
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
