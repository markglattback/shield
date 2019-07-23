const { Permission, Role, User } = require('../../models');

const GET_PERMISSIONS = async () => Permission.find();
const GET_ROLES = async () => Role.find();
const GET_USERS = async () => User.find();

module.exports = {
  GET_PERMISSIONS,
  GET_ROLES,
  GET_USERS,
};
