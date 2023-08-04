const { connect, connection } = require('mongoose');

//connection to our mongodb
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia';

connect(connectionString);

module.exports = connection;
