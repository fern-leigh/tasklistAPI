const validateNewTaskData = (req, res, next) => {
    const newTask = req.body;
    
    const validKeys = ["title", "description", "category", "dueDate", "effort"];
    const unrecognizedKeys = [];
    const checkForExtraKeys = () => {
        const taskKeys = Object.keys(newTask);
        taskKeys.forEach((el) => {
           if(!validKeys.includes(el)){
            unrecognizedKeys.push(el);
           } 
        })
    }
    checkForExtraKeys();
    //check newTask has title (required)
    if(!newTask.title) {
        let missingRequiredFieldError = new Error('Task title was not defined.');
        missingRequiredFieldError.status = 400;
        return next(missingRequiredFieldError);
    } else if (unrecognizedKeys.length > 0) {
        let unrecognizedKeysError = new Error(`Request contains unrecognized keys: ${unrecognizedKeys}`);
        unrecognizedKeysError.status = 400;
        return next(unrecognizedKeysError);
    } else {
        req.newTask = newTask;
        next();
    }
}

module.exports = {
    validateNewTaskData
}