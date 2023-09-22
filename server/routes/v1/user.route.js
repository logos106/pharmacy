const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

router.get('/test', auth(), userController.test);

module.exports = router;



