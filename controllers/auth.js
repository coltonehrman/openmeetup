const { User } = require('../models');

const signup = async (req, res) => {
  const { session, body } = req;
  const { username, email, password } = body;

  try {
    if (!username || !email || !password)
      throw new Error('Please send all required fields to create User object.');

    let user = await User.create({ username, email, password });

    user = user.dataValues;

    // remove password from user session
    delete user.password;

    session.user = user;

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  const { session, body } = req;
  const { email, username, password } = body;

  console.log(body);

  try {
    if ((!username && !email) || !password)
      throw new Error('Please send all required fields to create User object.');

    if (username && email)
      throw new Error('Please only send either a username or email to login with.');

    let user;

    if (username) {
      user = await User.findOne({ where: { username }});
    } else if (email) {
      user = await User.findOne({ where: { email }});
    }

    if (!user) throw new Error('No User exists.');

    if (!(await user.isValidPassword(password))) throw new Error('Invalid password for user.');

    user = user.dataValues;

    // remove password from user session
    delete user.password;

    session.user = user;
    
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(null);
  });
};

module.exports = {
  signup,
  login,
  logout
};
