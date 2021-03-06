const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  isValidPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, match) => {
        if (err) return reject(err);
        resolve(match);
      });
    });
  }
}

const hashPassword = (password) => new Promise((resolve, reject) => {
  const SALT_ROUNDS = 10;

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) return reject(err);
    resolve(hash);
  });
});

module.exports = (sequelize, DataTypes) => {
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    location: DataTypes.GEOGRAPHY('POINT', 4326)
  }, { sequelize });

  User.addHook('beforeCreate', async (user) => {
    const { password } = user;
    try {
      user.password = await hashPassword(password);
    } catch (err) {
      throw new Error(`Could\'t hash password: ${err}`);
    }
  });

  return User;
};
