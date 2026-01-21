const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register Admin
// exports.registerAdmin = async (req, res) => {
//   const { name, email, password, role_id } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const q = "INSERT INTO admin (name, email, password, role_id) VALUES (?, ?, ?, ?)";
//     await db.query(q, [name, email, hashedPassword, role_id || 1]);

//     res.json({ message: "Admin registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering admin", error });
//   }
// };


exports.registerAdmin = async (req, res) => {
  const { name, email, password, role_id } = req.body;

  try {
    // Check if any admin exists
    const [admins] = await db.query("SELECT COUNT(*) AS count FROM admin");
    const adminExists = admins[0].count > 0;

    // If admins exist → only authorized users can register
    if (adminExists && !req.user) {
      return res.status(401).json({
        message: "Unauthorized: Token required because admin already exists"
      });
    }

    // If admins exist but user does not have correct role
    if (adminExists && ![1, 5].includes(req.user.role_id)) {
      return res.status(403).json({
        message: "Forbidden: Only admin/super-admin can create new admins"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    await db.query(
      "INSERT INTO admin (name, email, password, role_id) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role_id || 1]
    );

    res.json({
      message: adminExists ? "Admin registered" : "FIRST ADMIN created successfully (bootstrap)"
    });

  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};


// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [email]);

    if (rows.length === 0)
      return res.status(400).json({ message: "Admin not found" });

    const admin = rows[0];

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { admin_id: admin.admin_id, role_id: admin.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
