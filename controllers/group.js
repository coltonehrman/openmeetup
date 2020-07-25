const { Group, User } = require('../models');

const create = async (req, res) => {
  const { body } = req;
  const { title, description, location = {} } = body;
  const { long, lat } = location;

  if (!title) {
    console.error('Must include title for Group.');
    return res.status(500).end();
  }

  const locationPoint = (typeof long !== 'undefined' || typeof lat !== 'undefined') ? {
    type: 'Point',
    coordinates: [long, lat],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  } : null;

  const group = await Group.create({ title, description, location: locationPoint });
  res.status(200).json(group);
};

const getAll = async (req, res) => {
  const groups = await Group.findAll();
  res.status(200).json(groups);
};

const join = async (req, res) => {
  const { session, params } = req;
  const { user } = session;
  const { id } = params;

  if (!user) {
    console.error('No User session to join group.');
    return res.status(500).end();
  }

  try {
    const group = await Group.findByPk(id);
    const result = await group.addMember(user.id);
    res.status(200).end();
  } catch (err) {
    console.error('Something went wrong: ', err);
    res.status(500).end();
  }
};

const leave = async (req, res) => {
  const { session, params } = req;
  const { user } = session;
  const { id } = params;

  if (!user) {
    console.error('No User session to join group.');
    return res.status(500).end();
  }

  try {
    const group = await Group.findByPk(id);
    const result = await group.removeMember(user.id);
    res.status(200).end();
  } catch (err) {
    console.error('Something went wrong: ', err);
    res.status(500).end();
  }
};

module.exports = {
  create,
  getAll,
  join,
  leave
};
