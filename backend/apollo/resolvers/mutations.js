const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApolloError, AuthenticationError } = require('apollo-server');
const { Permission, Role, User } = require('../../models');

/*

CREATE_PERMISSION

CREATE_ROLE

add some of the above to the database

*/

const CREATE_PERMISSION = async (parent, { name }) => Permission.create({ name });

const CREATE_ROLE = async (parent, { name, permissions }) => {
  // 1. check that the permission IDs supplied are valid
  permissions.forEach((id) => {
    const valid = Permission.findById(id);
    if (!valid) throw new ApolloError(`${id} is not a valid ID`);
  });

  // 2. add role to the database
  const role = Role.create({ name, permissions });

  // 3. add role ID to any permissions
  const { id } = role;

  permissions.forEach((pid) => {
    Permission.findByIdAndUpdate(pid, { $addToSet: { roles: id } }, { new: true });
  });

  return role;
};

const CREATE_USER = async (parent, { data }) => {
  console.log('CREATE_USER resolver called');
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

const LOGIN = async (parent, { email, password }, { res }) => {
  // retrieve user from database
  const user = await User.findOne({ email });
  if (!user) throw new AuthenticationError('Authentication unsuccessful');

  // check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AuthenticationError('Authentication unsuccessful');

  // create a signed token
  const token = jwt.sign({ id: user.id, roles: user.roles, name: user.firstName }, process.env.SECRET);

  // attach token cookie to respons
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  // return user
  return user;
};

module.exports = {
  CREATE_PERMISSION,
  CREATE_ROLE,
  CREATE_USER,
  LOGIN,
};
