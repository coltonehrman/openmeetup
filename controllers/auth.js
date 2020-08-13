const { User } = require('../models');

const signup = async (req, res) => {
  const { session, body } = req;
  const { username, email, password } = body;

  if (!username || !email || !password) {
    const error = 'Please send all required fields to create User object.';
    console.error(error);
    return res.status(500).json(error);
  }

  try {
    let user = await User.create({ username, email, password });
    user = user.dataValues;
    delete user.password;
    session.user = user;
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { session, body } = req;
  const { email, username, password } = body;

  console.log(session, body);

  if ((!username && !email) || !password) {
    console.error('Please send all required fields to create User object.');
    return res.status(500).end();
  }

  if (username && email) {
    console.error('Please only send either a username or email to login with.');
    return res.status(500).end();
  }

  let user;
  if (username) {
    user = await User.findOne({ where: { username }});
  } else if (email) {
    user = await User.findOne({ where: { email }});
  }

  if (!user) {
    const error = 'No User exists.';
    console.error(error);
    return res.status(500).json(error);
  }

  if (!(await user.isValidPassword(password))) {
    console.error('Invalid password for user.');
    return res.status(500).end();
  }

  user = user.dataValues;
  delete user.password;
  session.user = user;
  res.status(200).json(user);
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error when trying to destroy session: ', error);
      return res.status(500).end();
    }
    return res.status(200).end();
  })
};

module.exports = {
  signup,
  login,
  logout
};
