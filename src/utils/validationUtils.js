const dayjs = require('dayjs')
const { ObjectId } = require('mongodb');

const createDefaultTask = () => {
    let defaultTask = {
        _id: new ObjectId(),
        name: 'Just test',
        subject: 'Studies',
        dayToComplete: dayjs().format('YYYY-MM-DD'),
        priority: '30%',
        completed: false,
        location: [32.0853, 34.7818],
    }

    return defaultTask;
}

module.exports = { createDefaultTask };