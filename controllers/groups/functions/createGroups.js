const { Group } = require('../../../models');
const { createLocationPoint } = require('../../postgis');

const createSingleGroup = async (userId, { title, description, location }) => {
  // check for valid title
  if (title.toString().trim() === '')
    throw new Error('Group must have a title.');

  // create group
  const group = await Group.create({
    title,
    description,
    location: createLocationPoint(location)
  }, {
    include: ['users']
  });

  // check for valid userId
  if (userId && !(Number.isNaN(parseInt(userId)))) {
    // add creator to group
    await group.addUser(userId, {
      through: {
        isMember: true,
        isOwner: true,
        isCreator: true
      }
    });

    await Promise.all([
      group.reload(),             // reload to populate users data
      group.populateMe(userId) // populate me
    ]);
  }

  return group;
};

module.exports = {
  createSingleGroup
};
