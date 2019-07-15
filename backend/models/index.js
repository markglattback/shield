const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

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
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'users');

module.exports = {
  User,
};
