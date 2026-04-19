

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
