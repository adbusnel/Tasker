const {Tasks} = require('../../../models/tasks.js')

module.exports = async (req, res) => {
    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}