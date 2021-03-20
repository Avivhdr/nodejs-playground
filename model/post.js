const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 256,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    // max: 256,
  },
},
/* { collection: 'users' } */
// eslint-disable-next-line function-paren-newline
);

module.exports = mongoose.model('Post', PostSchema);
