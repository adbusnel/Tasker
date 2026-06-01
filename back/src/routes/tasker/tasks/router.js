const express = require('express');
const router = express.Router();

const createTask = require('./createTask.js');
const updateTask = require('./updateTask.js');
const deleteTask = require('./deleteTask.js');
const getTaskById = require('./getTaskById.js');

router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;