const {Projects} = require('../../../models/projects.js')

module.exports = async (req, res) => {
    try {
        const newProject = new Projects(req.body)
        const savedProject = await newProject.save()
        res.status(201).json(savedProject)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}