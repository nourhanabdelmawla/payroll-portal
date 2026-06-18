const Employee = require("../modules/employee/employee.model");
const jwt = require("jsonwebtoken");




const authEmployee = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Access denied. Please log in first."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const employee = await Employee.findById(decoded.employeeId);

    if (!employee) {
      return res.status(401).json({
        ok: false,
        message: "Employee not found"
      });
    }

    req.user = {
      employeeId: employee._id,
      empCode: employee.employeeId
    };

    next();

  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: "Session expired. Please log in again."
    });
  }
};

module.exports = authEmployee;


// const authEmployee = async (req, res, next) => {
//   try {
//     let token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ ok: false, message: "Access denied. Please log in first." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     //console.log("decoded =", decoded);
//     req.user = {
//       employeeId: decoded.employeeId,
//       empCode: decoded.empCode
//     };
//     next();
//   } catch (err) {
//     return res.status(401).json({ ok: false, message: "Session expired. Please log in again." });
//   }
// };
// module.exports = authEmployee;

