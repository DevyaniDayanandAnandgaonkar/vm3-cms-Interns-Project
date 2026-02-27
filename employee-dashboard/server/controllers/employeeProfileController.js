// const db = require("../config/db");

// // ✅ Create Profile
// exports.createEmployeeProfile = async (req, res) => {
//   try {
//     const {
//       emp_id,
//       department_id,
//       designation_id,
//       joining_date,
//       contact_no,
//       email,
//       address,
//       skills,
//       status,
//     } = req.body;

//     const query = `
//       INSERT INTO emp_profile
//       (emp_id, department_id, designation_id, joining_date, contact_no, email, address, skills, status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     await db.execute(query, [
//       emp_id,
//       department_id,
//       designation_id,
//       joining_date,
//       contact_no,
//       email,
//       address,
//       skills,
//       status,
//     ]);

//     res.status(201).json({
//       success: true,
//       message: "Employee profile created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // ✅ Get Profile by emp_id
// exports.getEmployeeProfile = async (req, res) => {
//   try {
//     const { emp_id } = req.params;

//     const [rows] = await db.execute(
//       "SELECT * FROM emp_profile WHERE emp_id = ?",
//       [emp_id]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     res.json({ success: true, data: rows[0] });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // ✅ Update Profile
// exports.updateEmployeeProfile = async (req, res) => {
//   try {
//     const { emp_id } = req.params;
//     const {
//       department_id,
//       designation_id,
//       joining_date,
//       contact_no,
//       email,
//       address,
//       skills,
//       status,
//     } = req.body;

//     const query = `
//       UPDATE emp_profile
//       SET department_id=?, designation_id=?, joining_date=?, contact_no=?,
//           email=?, address=?, skills=?, status=?
//       WHERE emp_id=?
//     `;

//     await db.execute(query, [
//       department_id,
//       designation_id,
//       joining_date,
//       contact_no,
//       email,
//       address,
//       skills,
//       status,
//       emp_id,
//     ]);

//     res.json({
//       success: true,
//       message: "Profile updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
const db = require("../config/db");

// Helper function (undefined → null)
const safe = (value) => (value === undefined ? null : value);

// ✅ Create Profile
exports.createEmployeeProfile = async (req, res) => {
  try {
    const emp_id = req.user?.emp_id; // 👈 token se lo

    if (!emp_id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID missing in token",
      });
    }

    const {
      department_id,
      designation_id,
      joining_date,
      contact_no,
      email,
      address,
      skills,
      status,
    } = req.body;

    // 🔎 Check profile already exists
    const [existing] = await db.execute(
      "SELECT emp_profile_id FROM emp_profile WHERE emp_id = ?",
      [emp_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists. Use update API.",
      });
    }

    const query = `
      INSERT INTO emp_profile
      (emp_id, department_id, designation_id, joining_date,
       contact_no, email, address, skills, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      emp_id,
      safe(department_id),
      safe(designation_id),
      safe(joining_date),
      safe(contact_no),
      safe(email),
      safe(address),
      safe(skills),
      safe(status),
    ]);

    res.status(201).json({
      success: true,
      message: "Employee profile created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ Get Profile (Logged-in user)
exports.getEmployeeProfile = async (req, res) => {
  try {
    const emp_id = req.user?.emp_id; // 👈 token se

    const [rows] = await db.execute(
      `SELECT ep.*, d.department_name, ds.designation_name
       FROM emp_profile ep
       LEFT JOIN departments d ON ep.department_id = d.department_id
       LEFT JOIN designation ds ON ep.designation_id = ds.designation_id
       WHERE ep.emp_id = ?`,
      [emp_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ Update Profile
exports.updateEmployeeProfile = async (req, res) => {
  try {
    const emp_id = req.user?.emp_id;

    if (!emp_id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID missing in token",
      });
    }

    const fields = req.body;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    // Dynamic query build
    let query = "UPDATE emp_profile SET ";
    let values = [];

    Object.keys(fields).forEach((key, index) => {
      query += `${key} = ?`;
      values.push(fields[key]);

      if (index < Object.keys(fields).length - 1) {
        query += ", ";
      }
    });

    query += " WHERE emp_id = ?";
    values.push(emp_id);

    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};