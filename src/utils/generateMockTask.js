const dayjs = require('dayjs');
const { faker } = require('@faker-js/faker');

const createTask = (options = {}) => {
    const defaultTask = {
        name: faker.word.words(2),
        subject: "Work",
        dayToComplete: dayjs().toDate(),
        priority: '30%',
        completed: false,
        location: {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [-118.2437, 34.0522],
                    },
                    properties: {},
                },
            ],
        },
    };

    return { ...defaultTask, ...options };
};

module.exports = { createTask };