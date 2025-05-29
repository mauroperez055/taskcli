 /*
  Archivo principal 
 */
 
 require('./commands');
 const {connectDB} = require('./db');

 async function main() {
  await connectDB();
 }

 main();