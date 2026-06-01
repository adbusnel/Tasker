const {Projects} = require('../../../models/projects.js')

module.exports = async (req, res) => {
    try {
        console.log('Fetching all projects');
        const projects = await Projects.find().sort({ status: 1 })
        if (!projects) {
            return res.status(404).json({ message: 'No projects found' })
        }
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}