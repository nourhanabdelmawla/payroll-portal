

const Admin = require('./admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  }catch (err) {
    console.error(" ERROR DETAILS:", err); 
    res.status(500).json({ message: err.message });
  }
  // } catch (err) {
  //   res.status(500).json({ message: 'Server error' });
  // }
};


const Employee = require('../employee/employee.model');
const crypto = require('crypto');
const ExcelJS = require('exceljs');

const generateStrongPassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    password += charset[bytes[i] % charset.length];
  }
  return password;
};

exports.addNewEmployee = async(req, res) => {
  try {
    const { employeeId, name, phone, password } = req.body;
    if(!employeeId || !name ||!phone ||!password) return res.status(400).json({ message: "missed data" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      employeeId,
      name,
      phone,
      password: hashedPassword,
      isActive: true
    });

    res.json({
      message: "Employee has been added successfully"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.bulkCreateEmployees = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "please upload the excel file" });

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.worksheets[0];

    const dataToSave = [];
    const resultsForAdmin = [];

    const promises = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; 

      const employeeId = String(row.getCell(1).value);
      const name = row.getCell(2).value;
      const phone = String(row.getCell(3).value);

      const plainPassword = generateStrongPassword();
      
      resultsForAdmin.push({ employeeId, name, phone, password: plainPassword });

      promises.push(
        bcrypt.hash(plainPassword, 10).then(hashedPassword => {
          dataToSave.push({
            employeeId,
            name,
            phone,
            password: hashedPassword,
            isActive: true
          });
        })
      );
    });

    await Promise.all(promises);
    
    await Employee.insertMany(dataToSave);

    const outWorkbook = new ExcelJS.Workbook();
    const outWorksheet = outWorkbook.addWorksheet('Passwords');

    outWorksheet.columns = [
      { header: 'employeeId', key: 'employeeId', width: 15 },
      { header: 'name', key: 'name', width: 25 },
      { header: 'phone', key: 'phone', width: 15 },
      { header: 'password', key: 'password', width: 20 },
    ];

    resultsForAdmin.forEach(emp => {
      outWorksheet.addRow(emp);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=Employees_Credentials.xlsx'
    );

    await outWorkbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.getAllEmployees = async (req, res)=>{
  try {
    const employees = await Employee.find().sort({ employeeId: 1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({message:err.message});
  }
};
