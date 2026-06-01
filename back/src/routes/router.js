const express = require('express');
const router = express.Router();

const taskerRouter = require('./tasker/router');

router.use('/tasker', taskerRouter);

module.exports = router;