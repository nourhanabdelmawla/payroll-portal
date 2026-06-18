
const SalarySlip = require('../salarySlip/salarySlip.model');

exports.getSalaryByEmployeeId = async (mongoId) => {
  if (!mongoId) throw new Error('Employee identifier is missing');

  const slip = await SalarySlip.findOne({ employeeId: mongoId })
    .sort({ uploadedAt: -1 });

  if (!slip) {
    throw new Error('No salary slip available');
  }

  return {
    _id: slip._id,
    month: slip.month,
    filePath: slip.filePath,
    originalName: slip.originalName,
    uploadedAt: slip.uploadedAt
  };
};


