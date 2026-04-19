
const express = require('express');
const router = express.Router();
const { login } = require('./admin.controller');
router.post('/login', login);

module.exports = router;
