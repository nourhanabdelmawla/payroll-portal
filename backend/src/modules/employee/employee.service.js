const Employee = require('./employee.model');
const SalarySlip = require('../salarySlip/salarySlip.model');

exports.getSalaryByToken = async (token) => {
  
  if (!token) throw  new Error('Employee token is required');
  

  const employee = await Employee.findOne({ token, isActive: true }).select('name');
  if (!employee) throw new Error('the link is not true or expierd');

  //to find the latest salary slip
  const slip = await SalarySlip.findOne({ employeeId: employee._id })
    .sort({ uploadedAt: -1 }); 

  if (!slip) throw new Error ('There are no payroll statements currently available.ا');

  return { 
    employeeName: employee.name,
    month: slip.month,
    slipId: slip._id 
  };
};


// const Employee = require('./employee.model');
// const SalarySlip = require('../salarySlip/salarySlip.model');
// const { getCurrentMonthFolder } = require('../../utils/date.util');

// exports.getSalaryByToken = async (token) => {
//   if (!token) throw new Error('Employee token is required');

//   const employee = await Employee.findOne({ token, isActive: true });
//   if (!employee) throw new Error('Invalid token');

//   const month = getCurrentMonthFolder();

//   const slip = await SalarySlip.findOne({
//     employeeId: employee.employeeId,
//     month
//   });

//   if (!slip) throw new Error('No salary available yet');

//   //return filePath
//   return { 
//     image: `http://localhost:3000/${slip.filePath}` 
//   };
// };






