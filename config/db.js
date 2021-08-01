const mongoose = require('mongoose');
// const { model } = require('../model/user');

const dbConnect = () => {
  mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const { connection } = mongoose;
  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => console.log('Connected to DB'));
};

module.exports = dbConnect;
