
const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());
//app.use('/uploads', express.static(path.join(__dirname, './uploads')));
//app.use("/uploads", express.static("uploads"));


const employeeRoutes = require('./modules/employee/employee.routes');
const adminRoutes = require('./modules/admin/admin.routes')
const salaryRoutes= require('./modules/salarySlip/salarySlip.routes')
// Employee API

app.use('/api/admin/auth', adminRoutes);
app.use('/api/admin/salaries', salaryRoutes);
app.use('/api/employees', employeeRoutes);
module.exports = app;
