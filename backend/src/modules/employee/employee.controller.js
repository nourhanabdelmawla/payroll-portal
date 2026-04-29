//employee controller

const Employee = require('./employee.model');
const employeeService = require('./employee.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const ExcelJS = require('exceljs');


exports.loginEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    const employee = await Employee.findOne({ employeeId:Number(employeeId), isActive: true });

    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      return res.status(401).json({ message: "user or password may be incorrect" });
    }

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { employeeId: employee._id, empCode: employee.employeeId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ ok: true, name: employee.name, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





exports.getSalarySlip = async (req, res) => {
  try {
    const result = await employeeService.getSalaryByEmployeeId(req.user.employeeId); 
    
    res.json({ ok: true, data: result });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};