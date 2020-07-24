require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SessionStore = require('connect-session-sequelize')(session.Store);

const auth = require('./controllers/auth');
const group = require('./controllers/group');
const sequelize = require('./db');

const { User, Group, UserGroup, Event, Category, EventCategory } = require('./models');

const verifyAndSyncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // sync db models
    // await sequelize.sync({ force: true, alter: true });
    // console.log('Synced database models.');
  } catch (error) {
    throw new Error('Unable to connect to the database:', error);
  }
};

const main = async () => {
  await verifyAndSyncDB();
  const {
    PORT = 3000,
    SESSION_SECRET = 'stupid secret fake session secret key'
  } = process.env;

  const app = express();
  const MAX_AGE = 1000 * 60 * 60 * 24; // 8 Hours

  const sequelizeSessionStore = new SessionStore({
    db: sequelize,
    expiration: MAX_AGE
  });

  app.set('trust proxy', 1);
  app.use(bodyParser.json());
  app.use(session({
    secret: SESSION_SECRET,
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: MAX_AGE },
    rolling: true
  }));

  app.use(express.static(path.join(__dirname, '/public')));

  app.post('/signup', auth.signup);
  app.post('/login', auth.login);
  app.post('/logout', auth.logout);
  app.get('/groups', group.getAll);
  app.post('/groups', group.create);
  app.post('/groups/:id/join', group.join);
  app.post('/groups/:id/leave', group.leave);

  app.get('/session', async (req, res) => {
    const { session } = req;
    let { user } = session;

    if (user) {
      user = new User(user);
      const groups = await user.getGroups();
      user = user.dataValues;
      user.groups = groups;
      
      return res.status(200).json(user);
    }

    res.status(200).json({});
  });

  app.get('/', (_, res) => res.sendFile(path.join(__dirname, '/index.html')));
  
  app.get('/data', async (_, res) => {
    const { Session } = sequelize.models;
    let users = await User.findAll();

    users = await Promise.all(users.map(async user => ({
      ...(user.dataValues),
      groups: await user.getGroups()
    })));

    const groups = await Group.findAll();
    const userGroups = await UserGroup.findAll();
    const events = await Event.findAll();
    const categories = await Category.findAll();
    const eventCategories = await EventCategory.findAll();
    const sessions = await Session.findAll();

    res.json({
      users,
      groups,
      userGroups,
      events,
      categories,
      eventCategories,
      sessions
    });
  });

  app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
};

main();
