require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SessionStore = require('connect-session-sequelize')(session.Store);

const auth = require('./controllers/auth');
const groupsRouter = require('./controllers/groups');
const eventsRouter = require('./controllers/events');
const categoriesRouter = require('./controllers/categories');

const {
  sequelize,
  Sequelize,
  User,
  Group,
  Event,
  Category,
  UserGroup,
  UserEvent,
  GroupCategory
} = require('./models');

const main = async () => {
  await sequelize.sync();

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

  sequelizeSessionStore.sync();

  app.use(express.static(path.join(__dirname, '/public')));

  app.post('/signup', auth.signup);
  app.post('/login', auth.login);
  app.post('/logout', auth.logout);
  app.use('/groups', groupsRouter);
  app.use('/events', eventsRouter);
  app.use('/categories', categoriesRouter);

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

    res.status(200).json(null);
  });

  app.get('/', (_, res) => res.sendFile(path.join(__dirname, '/index.html')));
  
  app.get('/data', async (_, res) => {
    const { Session } = sequelize.models;

    // kill all sessions
    // await Session.destroy({ truncate: true });

    const users = await User.findAll({ include: [
      'events', {
        association: 'groups',
        through: {
          as: 'user',
          attributes: ['isMember', 'isOwner', 'isCreator']
        }
      }]
    });

    users.forEach(user => {
      user.groups.forEach(group => {
        if (group.location) group.location = group.location.coordinates;
      });
    });

    const groups = await Group.findAll({
      include: ['users', 'events', 'categories']
    });

    const events = await Event.findAll({ include: ['users', 'group'] });
    const categories = await Category.findAll({ include: ['groups'] });
    
    const userGroups = await UserGroup.findAll();
    const userEvents = await UserEvent.findAll();
    const groupCategories = await GroupCategory.findAll();

    const sessions = await Session.findAll();

    const LONG = 29.7807005;
    const LAT = -95.9741705;
    const MILE_RANGE = 13;

    // const result = await Group.findAll({
    //   where: Sequelize.where(
    //     Sequelize.fn('ST_DWithin',
    //       Sequelize.col('location'),
    //       Sequelize.fn('ST_SetSRID',
    //         Sequelize.fn('ST_MakePoint',
    //           LONG,
    //           LAT),
    //         4326),
    //       MILE_RANGE * 1609.34),
    //     true)
    // });

    res.json({
      // result,
      users,
      groups,
      events,
      categories,
      userGroups,
      userEvents,
      groupCategories,
      sessions
    });
  });

  app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
};

main();
