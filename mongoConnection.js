const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://admin:superpassword@avivscluster.iihbr.mongodb.net/mydb?retryWrites=true&w=majority';

// const mongoDB = 'mongodb+srv://admin:2-savior@avivscluster-iihbr.mongodb.net/test?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(mongoDB, options);

const db = mongoose.connection;

db.on('error', () => console.error('connection error:\n'));
db.on('open', () => console.log('connection open'));
db.once('on', () => console.log('connection open'));
