const db = require("../config/db");

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const sql = "SELECT department_id, department_name FROM departments";
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ error: "Server error" });
  }
};
