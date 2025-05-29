/*
  Comandos que utilizo en mi app
*/

const { program } = require('commander'); //programm es un objeto que permite procesar lo que tipeo en consola
const { input } = require('@inquirer/prompts');
const { addTask, listTask, removeTask, updateTask, findTask } = require('./controllers/task.controllers');

//le asigno una version y una descripcion a mi programa
program.version('0.0.1').description('A command line tool for managing task'); 

//preguntas de la tarea
const taskQuestion = async () => {
    const title = await input({
    message: "Task title",
  });

    //tengo que hacerlo con dos bloques y con @inquirer/prompts
    // utilizando input porque no me funciona prompt de inquirer
  const description = await input({
    message: "Task description",
  });

  return {title, description};
  
}

/*command nos permite crear nuestros propios comandos
action: funcion donde se escribe la logica del comando
save: nombre del comando
*/

//Comando para guardar una tarea con titulo y descripcion
program
  .command("save")
  .alias("s")
  .action(async () => {
    const answers = await taskQuestion();
    addTask(answers);
  }) 

  //Comando para listar las tareas
program
  .command("list")
  .alias("ls")
  .action(() => listTask());

  //Comando para eliminar una tarea 
program
  .command("delete <id>")
  .alias("d")
  .action((_id) => removeTask(_id));

  //Comando para actualizar una tarea
program
  .command('update <id>')
  .alias('u')
  .action(async (_id) => {
    const answers = await taskQuestion();
    await updateTask(_id, answers);
  });

  //Comando para buscar una tarea
  program
    .command('find <task>')
    .alias('f')
    .action((text) => findTask(text));

program.parse(process.argv);