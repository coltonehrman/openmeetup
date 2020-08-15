const { Group, Event, UserGroup } = require('../../../models');
const { createLocationPoint } = require('../../postgis');

const createSingleGroupEvent = async (userId, groupId, { title, description, time, isRemote, location }) => {
  // find group
  const group = await Group.findByPk(groupId);

  // check for valid group
  if (!group) throw new Error('Group does not exist.');

  // get user group
  const userGroup = await UserGroup.findOne({
    where: { userId, groupId }
  });

  // check for valid user group
  if (!userGroup) throw new Error('No User Group association exists.');

  // check that is atleast a member or owner or creator
  if (!userGroup.isMember && !userGroup.isOwner && !userGroup.isCreator)
    throw new Error('User is not a member or owner or creator of the Group.');

  // create event
  const event = await Event.create({
    title,
    description,
    time,
    isRemote,
    location: createLocationPoint(location)
  });

  // associate event to group
  await group.addEvent(event);

  // assocaite user to event
  await event.addUser(userId, {
    through: {
      isParticipant: true,
      isOrganizer: true,
      isCreator: true
    }
  });

  await event.reload();

  return event;
};

module.exports = {
  createSingleGroupEvent
};
