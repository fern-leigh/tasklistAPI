const express = require('express');
const app = express();
const  {validateNewTaskData} = require('./utils/validation');
const {populateGeneratedFields, generateId} = require('./utils/generators');
const {tasks} = require('./data/tasks');

app.use(express.json()); // parses req.body into json

app.get('/tasks', (req, res, next) => {
    res.send(tasks);
})

app.post('/tasks', validateNewTaskData, populateGeneratedFields, (req, res, next) => {
    const newTask = req.newTask;
    const newTaskId = generateId();
    tasks[newTaskId] = newTask;
    res.status(201).send(tasks);
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
  });

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);  
});
