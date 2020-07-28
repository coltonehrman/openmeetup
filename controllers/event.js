const express = require('express');
const hasBodyProps = require('../middleware/hasBodyProps');
const hasUserSession = require('../middleware/hasUserSession');
const { Event, Group } = require('../models');

const router = express.Router();

const getAll = async (_, res) => {
  // find all events
  const events = await Event.findAll();

  res.status(200).json(events);
};

const createEvent = async (req, res) => {
  const { body } = req;
  const { title, description, time, isRemote, location } = body;
  let lat, long;

  if (typeof location === 'object' && location.long && location.lat) {
    long = location.long;
    lat = location.lat;
  }

  if (Array.isArray(location) && location.length === 2) {
    long = location[0];
    lat = location[1];
  }

  // create PostGID Geography Point data type
  const locationPoint = (typeof long !== 'undefined' || typeof lat !== 'undefined') ? {
    type: 'Point',
    coordinates: [long, lat],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  } : null;

  // create event
  const event = await Event.create({ title, description, time, isRemote, location: locationPoint });

  res.status(200).json(event);
};

const deleteEvent = async (req, res) => {
  const { params } = req;
  const { id: eventId } = params;

  try {
    // find event
    const event = await Event.findByPk(eventId);

    // if event doesn't exist
    if (!event) throw new Error('Event does not exist.');

    // remove all associations
    await Promise.all([
      event.setGroup(null),   // remove group association
      event.setMembers([]),   // remove all member associations
      event.setCategories([]) // remove all category associations
    ]);

    // delete event
    const result = await event.destroy();

    res.status(200).json(result);
  } catch (err) {
    const { message } = err;
    console.error(message);
    res.status(500).json(message);
  }
};

const assignEventToGroup = async (req, res) => {
  const { params } = req;
  const { eventId, groupId } = params;

  try {
    // find event
    const event = await Event.findByPk(eventId);

    // if event doesn't exist
    if (!event) throw new Error('Event does not exist.');

    const result = await event.setGroup(groupId);
    console.log(result);
    
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const joinEvent = async (req, res) => {
  const { session, params } = req;
  const { user: { id: userId } } = session;
  const { id: eventId } = params;

  try {
    // find event
    const event = await Event.findByPk(eventId);

    // if event doesn't exist
    if (!event) throw new Error('Event does not exist.');

    // add member to event
    const result = await event.addMember(userId);
    
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const leaveEvent = async (req, res) => {
  const { session, params } = req;
  const { user: { id: userId } } = session;
  const { id: eventId } = params;

  try {
    // find event
    const event = await Event.findByPk(eventId);

    // if event doesn't exist
    if (!event) throw new Error('Event does not exist.');

    // remove member from event
    const result = await event.removeMember(userId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const addCategoryToEvent = async (req, res) => {
  const { params } = req;
  const { eventId, categoryId } = params;

  try {
    // find event
    const event = await Event.findByPk(eventId);

    // if event doesn't exist
    if (!event) throw new Error('Event does not exist.');

    // add category to event
    const result = await event.addCategory(categoryId);
    
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const removeCategoryFromEvent = async (req, res) => {
  const { params } = req;
  const { eventId, categoryId } = params;

  try {
    // find event
    const event = await Event.findByPk(eventId);

    // if event doesn't exist
    if (!event) throw new Error('Event does not exist.');

    // remove category from event
    const result = await event.removeCategory(categoryId);
    
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

router.get('/', getAll);
router.post('/', hasUserSession, createEvent);
router.delete('/:id', hasUserSession, deleteEvent);
router.post('/:id/join', hasUserSession, joinEvent);
router.post('/:id/leave', hasUserSession, leaveEvent);
router.post('/:eventId/group/:groupId', hasUserSession, assignEventToGroup);
router.post('/:eventId/category/:categoryId', hasUserSession, addCategoryToEvent);
router.delete('/:eventId/category/:categoryId', hasUserSession, removeCategoryFromEvent);

module.exports = router;
