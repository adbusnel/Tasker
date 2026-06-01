const express = require('express');
const router = express.Router();

const getAllProjects = require('./getAllProjects.js');
const createProject = require('./createProject.js');
const getAllTasks = require('./getAllTasks.js');
// const updateProject = require('./updateProject.js');
// const deleteProject = require('./deleteProject.js');
// const getProjectById = require('./getProjectById.js');

router.get('/', getAllProjects);
router.get('/:projectId/tasks', getAllTasks);
// router.get('/projects/:id', getProjectById);
router.post('/', createProject);
// router.put('/projects/:id', updateProject);
// router.delete('/projects/:id', deleteProject);

module.exports = router;