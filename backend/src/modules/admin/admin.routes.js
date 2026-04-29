
const express = require('express');
const router = express.Router();
const { login } = require('./admin.controller');
const controller = require('./admin.controller');
const authAdmin = require('../../middlewares/authAdmin')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/login', login);

router.post('/addEmployee', authAdmin, controller.addNewEmployee);
router.post('/bulk', authAdmin, upload.single('file'), controller.bulkCreateEmployees);
router.get('/list', authAdmin, controller.getAllEmployees);


module.exports = router;
