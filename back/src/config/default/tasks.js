const { Tasks } = require('../../models/tasks');

module.exports = async () => {
    const tasks = await Tasks.findOne({ status: { $in: ['pending', 'in-progress', 'completed'] } });
    if (!tasks) {
        console.log('Creating default task...')
        await Tasks.create({
            title: 'Default Task',
            description: 'This is a default task created on first run.',
            status: 'pending',
        });
    } else {
        console.log('Default task already exists.')
    }
}