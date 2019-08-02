const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [ObjectId],
    required: true,
    default: [],
  },
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema, 'roles');

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  roles: {
    type: [ObjectId],
    required: true,
    default: [],
  },
}, { timestamps: true });

const Permission = mongoose.model('Permission', permissionSchema, 'permissions');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [ObjectId],
    required: true,
    default: [],
  },
  blacklisted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'users');

module.exports = {
  Role,
  Permission,
  User,
};
