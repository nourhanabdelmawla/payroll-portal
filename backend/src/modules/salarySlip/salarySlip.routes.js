const express = require("express");
const { uploadSalaryZip } = require ("../salarySlip/salarySlip.controller.js");
const authAdmin = require('../../middlewares/authAdmin.js');


const authEmployee = require  ("../../middlewares/authEmployee.js");
const SalarySlip = require ("./salarySlip.model.js");


const router = express.Router();

router.post("/upload-zip", authAdmin, uploadSalaryZip);

router.get("/download/:id",authEmployee, async (req, res) => {
    const slip = await SalarySlip.findById(req.params.id).lean();
    if (!slip) return res.status(404).json({ ok: false });

    if (String(slip.employeeId) !== String(req.user.employeeId)) {
        return res.status(403).json({ ok: false, message: "Access Denied" });
    }

    res.download(slip.filePath, slip.originalName); 
});

module.exports = router;




