const { Event } = require('../../../models');

const removeSingleGroupEvent = async (userId, groupId, eventId) => {
  // find event
  const event = await Event.findOne({
    where: { id: eventId, groupId }
  });

  // if event doesn't exist
  if (!event) throw new Error('Event does not exist.');

  // remove all associations
  await Promise.all([
    event.setGroup(null),   // remove group association
    event.setUsers([]),     // remove all user associations
    event.setCategories([]) // remove all category associations
  ]);

  // delete event
  await event.destroy();

  return event;
};

module.exports = {
  removeSingleGroupEvent
};
