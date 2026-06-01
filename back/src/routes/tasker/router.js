const express = require('express');
const router = express.Router();

const tasksRouter = require('./tasks/router');
const projectsRouter = require('./projects/router');

router.use('/tasks', tasksRouter);
router.use('/projects', projectsRouter);

module.exports = router;