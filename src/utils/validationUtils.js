const dayjs = require('dayjs')

const createDefaultTask = (index) => {

    // if (!index) {
    //     throw new Error("Invalid input data.");
    // }

    let defaultTask = {
        name: `Just test${index}`,
        subject: 'Studies',
        dayToComplete: dayjs().toDate(),
        priority: '30%',
        completed: false,
        location: [-118.2437, 34.0522],
    }

    return defaultTask;
}

const createUniqueTask = (index) => {
    const task = createDefaultTask();
    const uniqueSuffix = Date.now() + index; 
    task.name = `${task.name}${uniqueSuffix}`;
    const tasks = Array.from({ length: 3 }, (_, index) => createUniqueTask(index));
    return tasks;
  };

module.exports = { createDefaultTask, createUniqueTask };