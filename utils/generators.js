const {getCurrentDate} = require('./date-helpers');
const {tasks} = require('../data/tasks');

const populateGeneratedFields = (req, res, next) => {
    const today = getCurrentDate();
    req.newTask.createdDateDate = today;
    req.newTask.complete = false;
    next();
}


function generateId(){
    const keys = Object.keys(tasks);
    return Math.max(...keys)+1;
}

module.exports = {
    populateGeneratedFields,
    generateId
}
