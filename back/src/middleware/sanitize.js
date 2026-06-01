const sanitize = require('mongo-sanitize')

module.exports = (req, res, next) => {
    try {
        req.body = sanitize(req.body)
        next()
    } catch (error) {
        console.error('Error sanitizing input:', error)
        res.status(400).json({ error: 'Invalid input' })
    }
}