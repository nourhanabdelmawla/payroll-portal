const mongoose = require ("mongoose");

const salarySlipSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  // employeeId: { 
  //   type: Number, 
  //   required: true 
  // },
  month: String,
  filePath: String,
  originalName: String,
  uploadedAt: Date,
});

module.exports = mongoose.model('SalarySlip', salarySlipSchema);










