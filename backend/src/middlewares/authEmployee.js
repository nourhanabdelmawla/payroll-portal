
const jwt = require ("jsonwebtoken");
const Employee = require ("../modules/employee/employee.model.js");

const authEmployee = async (req, res, next) => {
  try {
    // employye link posible  from header or query
    let token = null;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "No token provided",
      });
    }

    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get employee from db
    const employee = await Employee.findById(decoded.employeeId).lean();

    if (!employee) {
      return res.status(401).json({
        ok: false,
        message: "Employee not found",
      });
    }

    if (!employee.isActive) {
      return res.status(403).json({
        ok: false,
        message: "Employee inactive",
      });
    }

    // add employree data to req
    req.user = {
      employeeId: employee._id,
      empCode: employee.empCode,
      name: employee.name,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: "Invalid token",
    });
  }
};

module.exports = authEmployee;