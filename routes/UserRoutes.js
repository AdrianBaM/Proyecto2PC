const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/user', UserController.getAllUsers);

module.exports = router;