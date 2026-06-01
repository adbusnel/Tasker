const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')
Joi.objectID = require('joi-objectid')(Joi)

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'to_test', 'done'], default: 'pending' },
    projectId: { type: Schema.Types.ObjectId, ref: 'projects' },
}, { timestamps: true })

const Tasks = mongoose.model('tasks', taskSchema)

const validateTasks = (task) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().valid('pending', 'in_progress', 'to_test', 'done').default('pending'),
        projectId: Joi.objectID().required()
    })
    return schema.validate(task)
}

module.exports = { Tasks, validateTasks}