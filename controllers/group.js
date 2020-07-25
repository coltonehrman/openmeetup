const express = require('express');
const hasBodyProps = require('../middleware/hasBodyProps');
const hasUserSession = require('../middleware/hasUserSession');
const { Group } = require('../models');

const router = express.Router();

const getAll = async (_, res) => {
  // find all groups
  const groups = await Group.findAll();

  res.status(200).json(groups);
};

const createGroup = async (req, res) => {
  const { body } = req;
  const { title, description, location } = body;
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

  // create group
  const group = await Group.create({ title, description, location: locationPoint });

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
      group.setMembers([]),   // remove all member associations
      group.setEvents([]),    // remove all event associations
      group.setCategories([]) // remove all category associations
    ]);

    // delete group
    const result = await group.destroy();

    res.status(200).json(result);
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

    // add member to group
    const result = await group.addMember(userId);
    
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

    // remove member from group
    const result = await group.removeMember(userId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const addCategoryToGroup = async (req, res) => {
  const { session, params } = req;
  const { user: { id: userId } } = session;
  const { groupId, categoryId } = params;

  try {
    // find group
    const group = await Group.findByPk(groupId);

    // if group doesn't exist
    if (!group) throw new Error('Group does not exist.');

    // for (let i in group) console.log(i)

    // add category to group
    const result = await group.addCategory(categoryId);
    
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

module.exports = router;
