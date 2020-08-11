const express = require('express');
const hasBodyProps = require('../middleware/hasBodyProps');
const hasUserSession = require('../middleware/hasUserSession');
const { Group } = require('../models');
const _ = require('lodash');

const router = express.Router();

const getAll = async (req, res) => {
  const me = _.get(req.session, 'user.id', null);

  // find all groups
  const groups = await Group.findAll({
    include: ['users', 'events', 'categories']
  });

  await Promise.all(groups.map(g => g.populateMe(me)));

  res.status(200).json(groups);
};

const createGroup = async (req, res) => {
  const { body, session } = req;
  const { title, description, location } = body;
  const { user: { id: userId } } = session;
  let lat, long;

  if (title.toString().trim() === '') {
    return res.status(500).json('Group must have a title.');
  }

  if (typeof location === 'object' && location.long && location.lat) {
    long = location.long;
    lat = location.lat;
  }

  if (Array.isArray(location) && location.length === 2) {
    long = location[0];
    lat = location[1];
  }

  if (
    (Number.isNaN(parseFloat(long)) || Number.isNaN(parseFloat(lat))) ||
    (long.toString().trim() === '' || lat.toString().trim() === '')
  ) {
    long = null;
    lat = null;
  }

  // create PostGID Geography Point data type
  const locationPoint = (long && lat && (typeof long !== 'undefined' || typeof lat !== 'undefined')) ? {
    type: 'Point',
    coordinates: [long, lat],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  } : null;

  // create group
  const group = await Group.create({ title, description, location: locationPoint }, {
    include: ['users']
  });

  await group.addUser(userId, {
    through: {
      isMember: true,
      isOwner: true,
      isCreator: true
    }
  });

  await group.reload();
  await group.populateMe(userId);

  res.status(200).json(group);
};

const deleteGroup = async (req, res) => {
  const { params } = req;
  const { id: groupId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // remove all associations
    await Promise.all([
      group.setUsers([]),     // remove all user associations
      group.setEvents([]),    // remove all event associations
      group.setCategories([]) // remove all category associations
    ]);

    // delete group
    await group.destroy();

    res.status(200).json(group);
  } catch (err) {
    const { message } = err;
    console.error(message);
    res.status(500).json(message);
  }
};

const joinGroup = async (req, res) => {
  const { session, params } = req;
  const { user: { id: userId } } = session;
  const { id: groupId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // add user to group
    const result = await group.addUser(userId);
    
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const leaveGroup = async (req, res) => {
  const { session, params } = req;
  const { user: { id: userId } } = session;
  const { id: groupId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // remove user from group
    const result = await group.removeUser(userId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const addCategoryToGroup = async (req, res) => {
  const { params } = req;
  const { groupId, categoryId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // add category to group
    const result = await group.addCategory(categoryId);
    
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const removeCategoryFromGroup = async (req, res) => {
  const { params } = req;
  const { groupId, categoryId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // remove category from group
    const result = await group.removeCategory(categoryId);
    
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

router.get('/', getAll);
router.post('/', hasUserSession, hasBodyProps('title'), createGroup);
router.delete('/:id', hasUserSession, deleteGroup);
router.post('/:id/join', hasUserSession, joinGroup);
router.post('/:id/leave', hasUserSession, leaveGroup);
router.post('/:groupId/category/:categoryId', hasUserSession, addCategoryToGroup);
router.delete('/:groupId/category/:categoryId', hasUserSession, removeCategoryFromGroup);

module.exports = router;
