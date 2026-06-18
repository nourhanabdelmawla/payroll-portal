const express = require("express");
const router = express.Router();
const authAdmin = require('../../middlewares/authAdmin')
const authEmployee = require("../../middlewares/authEmployee.js");
const SalarySlip = require("./salarySlip.model.js");
//const controller = require('./admin.controller');
const {uploadSalaryZip} = require('./salarySlip.controller');

const path = require("path");


router.post("/upload-zip", authAdmin, uploadSalaryZip);


router.get("/file/:id", authAdmin, async (req, res) => {
  try {
    const slip = await SalarySlip.findById(req.params.id).lean();

    if (!slip) {
      return res.status(404).json({ message: "Salary slip not found" });
    }


    const filePath = path.resolve(slip.filePath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline"); 

    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;