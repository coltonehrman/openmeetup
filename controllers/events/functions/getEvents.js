const { Event } = require('../../../models');

const getAllEvents = async ({ include }) => {
  const events = await Event.findAll({ include });
  return events;
};

module.exports = {
  getAllEvents
};
