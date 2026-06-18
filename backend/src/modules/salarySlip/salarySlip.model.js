const mongoose = require ("mongoose");

const salarySlipSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },

  month: String,
  filePath: String,
  originalName: String,
  uploadedAt: Date,
});

module.exports = mongoose.model('SalarySlip', salarySlipSchema);










