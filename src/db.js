/*
  Conexion a la base de datos
*/

const { connect, connection } = require('mongoose'); //nos permite hacer la conexion a la base de datos
const { MONGODB_URI } = require('./config');

//conexion a la base de datos
const connectDB = async () => {
  await connect(MONGODB_URI);
};

connection.on('error', err => console.log(err));

//exporto la funcion
module.exports = {
  connectDB,
  connection
}