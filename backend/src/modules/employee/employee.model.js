

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: String,
  token: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Employee', employeeSchema);

