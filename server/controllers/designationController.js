const db = require("../config/db");

//--------------- Add a new designation ----------------//
exports.addDesignation = async (req, res) => {
  const { department_id, designation_name } = req.body;

  if (!department_id || !designation_name) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = "INSERT INTO designation (department_id, designation_name) VALUES (?, ?)";

  try {
    const [result] = await db.query(sql, [department_id, designation_name]);
    res.status(201).json({ message: "Designation added", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
// ---------------- PUT (Full Update) ----------------
exports.updateDesignation = async (req, res) => {
  const { id } = req.params;
  const { department_id, designation_name } = req.body;

  if (!department_id || !designation_name) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const sql =
      "UPDATE designation SET designation_name = ?, department_id = ? WHERE designation_id = ?";

    const [result] = await db.query(sql, [designation_name, department_id, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.json({ message: "Designation updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
// ---------------- PATCH (Partial Update) ----------------
exports.patchDesignation = async (req, res) => {
  const { id } = req.params;
  const updates = [];
  const values = [];

  if (req.body.designation_name) {
    updates.push("designation_name = ?");
    values.push(req.body.designation_name);
  }

  if (req.body.department_id) {
    updates.push("department_id = ?");
    values.push(req.body.department_id);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const sql = `UPDATE designation SET ${updates.join(", ")} WHERE designation_id = ?`;
  values.push(id);

  try {
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.json({ message: "Designation updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};


// ---------------- DELETE ----------------
exports.deleteDesignation = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = "DELETE FROM designation WHERE designation_id = ?";

    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.json({ message: "Designation deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

//---------Get all designations-----------//
//---------Get all designations + employee count -----------//
exports.getDesignations = async (req, res) => {
  const sql = `
    SELECT 
      d.designation_id,
      d.designation_name,
      dp.department_name,
      (
        SELECT COUNT(*) 
        FROM employees e 
        WHERE e.designation_id = d.designation_id
      ) AS totalEmployees
    FROM designation d
    JOIN departments dp ON dp.department_id = d.department_id
    ORDER BY d.designation_id DESC
  `;

  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
