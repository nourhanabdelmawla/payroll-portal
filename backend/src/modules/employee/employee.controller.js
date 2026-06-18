
const Employee = require('./employee.model');
const employeeService = require('./employee.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const ExcelJS = require('exceljs');
const path = require('path');
const jwt = require('jsonwebtoken');
const tokenUtil = require('../../utils/token.util');


exports.refreshEmployeeToken = async (req, res) => {
  try {
    const { pToken } = req.body;

    const employee = await tokenUtil.verifyPermanentToken(pToken);

    const token = jwt.sign(
      {
        employeeId: employee._id,
        empCode: employee.employeeId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d"
      }
    );

    res.json({
      ok: true,
      token
    });

  } catch (err) {
    res.status(401).json({
      ok: false,
      message: err.message
    });
  }
};

exports.directLoginEmployee = async (req, res) => {
  try {
    const { pToken } = req.body;

  
    const employee = await tokenUtil.verifyPermanentToken(pToken);

  
    const token = jwt.sign(
      {  employeeId: employee._id, empCode: employee.employeeId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } 
    );

    res.json({
      ok: true,
      name: employee.name,
      employeeId: employee.employeeId,
      token: token
    });

  } catch (err) {
    res.status(401).json({ ok: false, message: err.message });
  }
};





exports.loginEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    const employee = await Employee.findOne({ employeeId: Number(employeeId), isActive: true });

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
    //console.log("req.user =", req.user);
    const slip = await employeeService.getSalaryByEmployeeId(req.user.employeeId);

    const filePath = slip.filePath;
    if (req.query.file === 'true') {

      const absolutePath = path.resolve(slip.filePath);

      return res.sendFile(absolutePath);
    }
    const employeeInfo = await Employee.findById(req.user.employeeId, { name: 1 });
    res.json({
      ok: true, data: slip,

    });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

