const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi);

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'to_test', 'done'], default: 'pending' },
})

const Projects = mongoose.model('projects', projectSchema);

const validateProjects = (project) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().valid('pending', 'in_progress', 'to_test', 'done').default('pending'),
    })
    return schema.validate(project);
}

module.exports = { Projects, validateProjects }