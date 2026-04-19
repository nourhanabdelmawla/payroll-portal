
const Employee = require('./employee.model');
const SalarySlip = require('../salarySlip/salarySlip.model');
const { getCurrentMonthFolder } = require('../../utils/date.util');

exports.getSalaryByToken = async (token) => {
  if (!token) throw new Error('Token is required');

  const employee = await Employee.findOne({ token, isActive: true });
  if (!employee) throw new Error('Invalid token');

  const month = getCurrentMonthFolder();

  const slip = await SalarySlip.findOne({
    employeeId: employee.employeeId,
    month
  });

  if (!slip) throw new Error('No salary available yet');

  //return filePath
  return { 
    image: `http://localhost:3000/${slip.filePath}` 
  };
};






