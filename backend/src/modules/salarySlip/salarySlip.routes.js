//salary slip route

const express = require("express");
const router = express.Router();

const authEmployee = require("../../middlewares/authEmployee.js");
const SalarySlip = require("./salarySlip.model.js");
const path = require("path");

// 🔐 Secure File View (مش download مباشر)
router.get("/file/:id", authEmployee, async (req, res) => {
  try {
    const slip = await SalarySlip.findById(req.params.id).lean();

    if (!slip) {
      return res.status(404).json({ message: "File not found" });
    }

    // 👇 حماية: الموظف يشوف ملفه بس
    if (String(slip.employeeId) !== String(req.user.employeeId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const filePath = path.resolve(slip.filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline"); // 👈 يفتح في نفس التاب

    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;