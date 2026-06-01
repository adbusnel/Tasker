const {Tasks} = require('../../../models/tasks')

module.exports = async (req, res) => {
    try {
        const tasks = await Tasks.find({ projectId: req.params.projectId }).sort({ status: 1 })
        console.log('Fetching tasks for project', req.params.projectId);
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found' })
        }
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}