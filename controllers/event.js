const express = require('express');
const hasBodyProps = require('../middleware/hasBodyProps');
const hasUserSession = require('../middleware/hasUserSession');
const { Event, Group } = require('../models');

const router = express.Router();

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

    // add user to event
    const result = await event.addUser(userId);
    
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
