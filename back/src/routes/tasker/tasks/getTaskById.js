const Tasks = require('../../../models/tasks')

module.exports = async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}