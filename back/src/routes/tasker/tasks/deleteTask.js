const { Tasks } = require('../../../models/tasks.js')

module.exports = async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}