const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
  employeeId: { type: Number, required: true, unique: true },
  name: String,
  phone: { type: String, required: true},
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  permanentLoginToken: {type:String, default:null}
});

module.exports = mongoose.model('Employee', employeeSchema);
