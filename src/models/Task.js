/*
 * Modelo y Esquema para guardar datos en mongoDB
*/

const {Schema, model} = require('mongoose');

//el Schema permite definir que voy a estar guardando en mongoDB
const taskSchema = new Schema({
  title: {type: String},
  description: {type: String}
}, {
  timestamps: true, //fecha de creacion y ultima fecha de actualizacion
  versionKey: false
})

module.exports = model('Task', taskSchema);