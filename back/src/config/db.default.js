const initDefaultTasks = require('./default/tasks');

module.exports = async () => {
    try {
        console.log('Initializing default data...')
        await initDefaultTasks()
    } catch (error) {
        console.error('Error initializing default data:', error)
    }
}