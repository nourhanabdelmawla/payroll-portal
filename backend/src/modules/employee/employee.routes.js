
const express = require('express');
const router = express.Router();
const controller = require('./employee.controller');
const authEmployee = require('../../middlewares/authEmployee')


router.post('/refresh-token', controller.refreshEmployeeToken);
router.post('/direct-login', controller.directLoginEmployee);
router.post('/login', controller.loginEmployee);

router.get('/salary', authEmployee, controller.getSalarySlip);


module.exports = router;



