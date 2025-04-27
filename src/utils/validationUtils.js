const dayjs = require('dayjs')

const createDefaultTask = (index) => {

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

module.exports = { createDefaultTask };