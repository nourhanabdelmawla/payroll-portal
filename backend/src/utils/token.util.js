const { v4: uuidv4 } = require('uuid');
const Employee = require('../modules/employee/employee.model');

exports.getOrCreatePermanentToken = async (mongoId) => {
  if (!mongoId) throw new Error('Employee ID is missing');
  const employee = await Employee.findById(mongoId);
  if (!employee) throw new Error('Employee not found');

  if (!employee.permanentLoginToken) {
    employee.permanentLoginToken = uuidv4();
    await employee.save();
  }
  return employee.permanentLoginToken;
};

exports.verifyPermanentToken = async (pToken) => {
  if (!pToken) throw new Error('Token is required');
  const employee = await Employee.findOne({ permanentLoginToken: pToken, isActive: true });
  if (!employee) throw new Error('Invalid or expired direct link');
  return employee;
};



