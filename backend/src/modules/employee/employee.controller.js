

const employeeService = require('./employee.service');
const Employee = require('./employee.model');
const { generateToken } = require('../../utils/token.util');
const XLSX = require('xlsx');


// add a new employee
exports.addNewEmployee = async(req,res) => {
  try {
    const{employeeId,name} = req.body;
    
    if(!employeeId || !name) {
      return res.status(400).json({message:"Missing Data"});
    }
    const token = generateToken();
     const employee = await Employee.create({
      employeeId,
      name,
      token,
      isActive: true
    });

    res.json({
      message: "Employee added successfully",
      employee,
      link: `http://localhost:5173/employee?token=${token}`
    });


  }catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

//  Bulk Create Employees from Excel
exports.bulkCreateEmployees = async (req, res) => {
  try {
    //  file from multer
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    // reading excil
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];

    const employees = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    if (!employees.length) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // prepare data
    const data = employees.map(e => ({
      employeeId: e.employeeId,
      name: e.name,
      token: generateToken(),
      isActive: true
    }));

    const result = await Employee.insertMany(data);

    // generate links
    const links = result.map(e => ({
      employeeId: e.employeeId,
      name: e.name,
      token: e.token,
      link: `http://localhost:5173/employee?token=${e.token}`
    }));

    res.json({
      message: "Employees uploaded successfully",
      created: result.length,
      links
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// get all employees for dashboard
exports.getAllEmployees = async (req, res)=>{
  try {
    const employees = await
    Employee.find ().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({message:err.message});
  }
};


//  Employee action
exports.getSalarySlip = async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    const result = await employeeService.getSalaryByToken(token);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


