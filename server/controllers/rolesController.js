const db = require("../config/db");

exports.getAllRoles = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM roles");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({ message: "Error fetching roles", error });
  }
};

exports.getRoleById = async (req, res) => {
  const roleId = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM roles WHERE role_id = ?", [
      roleId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching role:", error);
    return res.status(500).json({ message: "Error fetching role", error });
  }
};

exports.createRole = async (req, res) => {
  const { role_name } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO roles (role_name) VALUES (?)",
      [role_name]
    );
    res.status(201).json({
      message: "Role created successfully",
      role_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).json({ message: "Error creating role", error });
  }
};

exports.updateRole = async (req, res) => {
  const roleId = req.params.id;
  const { role_name } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE roles SET role_name = ? WHERE role_id = ?",
      [role_name, roleId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Error updating role:", error);
    return res.status(500).json({ message: "Error updating role", error });
  }
};
