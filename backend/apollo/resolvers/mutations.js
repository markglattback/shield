const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const CREATE_USER = async (parent, { data }) => {
  console.log('CREATE_USER resolver');
  // make email lowercase
  const email = data.email.toLowerCase();
  // hash password
  const password = await bcrypt.hash(data.password, 10);
  // add user to the database
  const user = await User.create({
    ...data,
    email,
    password,
  });

  return user;
};

module.exports = {
  CREATE_USER,
};
