

const express = require('express');
const router = express.Router();
const controller = require('./employee.controller');
const multer = require('multer');
const authAdmin = require('../../middlewares/authAdmin')
const authEmployee = require('../../middlewares/authEmployee')

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/addEmployee',controller.addNewEmployee
);
router.post(
  '/bulk',
  upload.single('file'), 
  controller.bulkCreateEmployees
);

router.get('/list',authAdmin,controller.getAllEmployees);
router.get('/salary',authEmployee,controller.getSalarySlip);

module.exports = router;
