const { Event } = require('../../../models');
const { createLocationPoint } = require('../../postgis');

const createSingleEvent = async (userId, { title, description, time, isRemote, location }) => {
  // create event
  const event = await Event.create({
    title,
    description,
    time,
    isRemote,
    location: createLocationPoint(location)
  }, {
    include: ['users']
  });

  // check for valid userId
  if (userId && !(Number.isNaN(parseInt(userId)))) {
    // add creator to event
    await event.addUser(userId, {
      through: {
        isParticipant: true,
        isOrganizer: true,
        isCreator: true
      }
    });

    await event.reload();
  }

  return event;
};

module.exports = {
  createSingleEvent
};
