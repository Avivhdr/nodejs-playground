const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   min: 6,
  //   max: 256,
  //   unique: true,
  // },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 256,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
},
/* { collection: 'users' } */
// eslint-disable-next-line function-paren-newline
);

module.exports = mongoose.model('User', UserSchema);
