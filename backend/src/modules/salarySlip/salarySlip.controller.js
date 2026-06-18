const unzipper = require ("unzipper");
const fs = require ("fs");
const path = require ("path");
const Employee = require ("../employee/employee.model");
const SalarySlip = require ("./salarySlip.model");
const multer = require("multer");


//to upload a single slip



const upload = multer({
  dest: "tmp/",
  limits: { fileSize: 200 * 1024 * 1024 },
});

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function empCodeFromFilename(filename) {
  const base = path.basename(filename, path.extname(filename));
  return base.trim();
}

//to read inside file
function getAllPdfFiles(dir) {
  let results = [];

  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllPdfFiles(fullPath));
    } else if (file.toLowerCase().endsWith(".pdf")) {
      results.push(fullPath);
    }
  });

  return results;
}

exports.uploadSalaryZip = [
  upload.single("zip"),
  async (req, res, next) => {
    const start = Date.now();

    try {
      if (!req.file) {
        return res.status(400).json({ ok: false, message: "No ZIP uploaded" });
      }

      const { month } = req.body;
      if (!month) {
        return res.status(400).json({ ok: false, message: "month required" });
      }

      const outDir = path.join("uploads", "salaries", month);
      ensureDir(outDir);

      await fs
        .createReadStream(req.file.path)
        .pipe(unzipper.Extract({ path: outDir }))
        .promise();


      fs.unlink(req.file.path, () => {});

      //here is a problem 

      //const all = fs.readdirSync(outDir);
      //const pdfFiles = all.filter((f) => f.toLowerCase().endsWith(".pdf"));

      //instead to read the inside folders

      const pdfFiles = getAllPdfFiles(outDir);

    


      const employees = await Employee.find({}, { _id: 1, employeeId: 1 }).lean();
      const map = new Map(employees.map((e) => [String(e.employeeId).trim(), e._id]));

      const toInsert = [];
      const failed = [];
       
      //cause same problem
      //for (const fileName of pdfFiles) {
        //const code = empCodeFromFilename(fileName);
        //const empId = map.get(String(code));       
      //the new maintanice
      for (const fullPath of pdfFiles) {
        const fileName = path.basename(fullPath);
        const code = empCodeFromFilename(fileName);
        const empId = map.get(String(code));       

        if (!empId) {
          failed.push({ fileName, reason: `No employee for code=${code}` });
          continue;
        }

        //const filePath = path.join(outDir, fileName).replace(/\\/g, "/");
        const filePath = fullPath.replace(/\\/g, "/");

        toInsert.push({
          employeeId: empId,
          month,
          filePath,
          originalName: fileName,
          uploadedAt: new Date(),
        });
      }

      await SalarySlip.deleteMany({ month });
      const inserted = await SalarySlip.insertMany(toInsert, { ordered: false });

      return res.json({
        ok: true,
        message: "Uploaded Successfully!", 
        matchedAndSaved: inserted.length,
        notMatched: failed.length,
        ms: Date.now() - start,
      });
    } catch (err) {
      next(err);
    }
  },
];


