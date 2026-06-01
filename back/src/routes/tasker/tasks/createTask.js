const { validateTasks, Tasks } = require('../../../models/tasks')

module.exports = async (req, res) => {
    const { error } = validateTasks(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    try {
        const task = new Tasks({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || 'pending',
        })
        await task.save()
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}