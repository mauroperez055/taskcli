/*
 * Contiene las funciones para poder guardar, listar, buscar y eliminar tareas
 * Al final del archivo se exportan las funciones para utilizarlas en el archivo commands.js
 */

const Task = require('../models/Task');
const { connection } = require('../db');

// agregar una tarea
const addTask = async (task) => {
   await Task.create(task);
   await console.log('New Task Created');
   await connection.close(); //cierra la conexion una vez creada la tarea
}

// listar las tareas
const listTask = async (task) => { 
  //con lean convertimos los objetos tasks que son objetos de mongodb en objetos de javascript
  const tasks = await Task.find().lean(); 
  //filtro (mapeo) el arreglo tasks para que solo muestre el titulo y la descripcion
  console.table(tasks.map(task => ({
    _id: task._id.toString(),
    title: task.title,
    description: task.description
  })));
  await connection.close();
}

// eliminar una tarea
const removeTask = async (_id) => {
  await Task.findByIdAndDelete(_id);
  console.log('Task Delete');
  await connection.close();
}

// actualizar tarea
const updateTask = async (_id, newTask) => {
  await Task.findByIdAndUpdate(_id, newTask);
  console.log('Task Updated');
  await connection.close();
}

// buscar tarea
const findTask = async (text) => {
  const search = new RegExp(text, 'i'); //expresion regular donde la busqueda no es sensible a mayusculas o minusculas (i)
  const tasks = await Task.find({ //arreglo tasks donde se guarda el resultado de la busqueda
    $or: [{title: search}, {description: search}] //utilizo $or para que busque en el titulo y la descripcion
  }).lean();
  
  if (tasks.length === 0) {
    console.log('No tasks found');
    await connection.close();
    process.exit(0);
  }

  console.table(tasks.map(task => ({
    id: task._id.toString(),
    title: task.title,
    description: task.description
  })));

  /* console.table({
    id: tasks[1]._id.toString(),
    title: tasks[1].title,
    description: tasks[1].description
  }) */

  await connection.close();
}

module.exports = {
  addTask,
  listTask, 
  removeTask,
  updateTask,
  findTask
}; 