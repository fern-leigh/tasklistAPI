const express = require('express');
const app = express();

const tasks = {
    1 : {
        title: 'example task',
        description: 'Optional: give more details about what the task involves',
        createdDate: 'The date the task was crreated',
        dueDate: 'The task deadline',
        complete: false,
        category: 'chores, for example',
        effort: 5
    }
}

function getCurrentDate() {
    const unforamttedDate = new Date(Date.now()); 
    const date = unforamttedDate.getDate();
    const month = unforamttedDate.getMonth();
    const year = unforamttedDate.getFullYear();
    return `${date}/${month+1}/${year}`
}

function generateId(){
    const keys = Object.keys(tasks);
    return Math.max(...keys)+1;
}

const validateTaskData = (req, res, next) => {
    const newTask = req.body;
    //check newTask has title (required)
    if(!newTask.title) {
        let missingRequiredFieldError = new Error('Task title was not defined.');
        missingRequiredFieldError.status = 400;
        return next(missingRequiredFieldError);
    } else {
        req.newTask = newTask;
        next();
    }
}

const populateGeneratedFields = (req, res, next) => {
    const today = getCurrentDate();
    req.newTask.createdDateDate = today;
    req.newTask.complete = false;
    next();
}

app.use(express.json()); // parses req.body into json

app.get('/tasks', (req, res, next) => {
    res.send(tasks);
})

app.post('/tasks', validateTaskData, populateGeneratedFields, (req, res, next) => {
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
