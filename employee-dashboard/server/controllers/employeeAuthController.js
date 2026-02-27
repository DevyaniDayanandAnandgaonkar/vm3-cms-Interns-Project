
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "All fields required" });

    const [rows] = await db.query(
      "SELECT * FROM employees WHERE email=?",
      [email]
    );

    if (rows.length === 0)
      return res.status(401).json({ msg: "User not found" });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ msg: "Invalid password" });

    // ================= YEAR CHECK WITH CARRY FORWARD =================
    const year = new Date().getFullYear();
    
// 🔥 TESTING PURPOSE
     //const year = 2026;   // temporarily hardcoded
    const previousYear = year - 1;
     const [current] = await db.query(
      "SELECT * FROM leave_balance WHERE emp_id=? AND year=?",
      [user.emp_id, year]
    );

    if (current.length === 0) {

      const [previous] = await db.query(
        "SELECT * FROM leave_balance WHERE emp_id=? AND year=?",
        [user.emp_id, previousYear]
      );

      let carryForward = 0;

      if (previous.length > 0) {
        const remaining =
          (previous[0].total_leaves + previous[0].carry_forward) -
          previous[0].used_leaves;

        carryForward = Math.min(remaining, 6); // max 6 carry
      }
      // console.log("Current Year:", year);
      // console.log("Previous Year:", previousYear);
      // console.log("Carry Forward:", carryForward);
   

      await db.query(
        `INSERT INTO leave_balance
         (emp_id, year, total_leaves, carry_forward, used_leaves, maternity_total, maternity_used)
         VALUES (?, ?, 20, ?, 0, 90, 0)`,
        [user.emp_id, year, carryForward]
      );
      console.log("New Year Record Created for:", user.emp_id);
    }

    // ================= TOKEN =================
    const token = jwt.sign(
      { emp_id: user.emp_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      emp_id: user.emp_id,
      name: user.name
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};



// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender)
      return res.status(400).json({ msg: "Required fields missing" });

    const [exist] = await db.query(
      "SELECT * FROM employees WHERE email=?",
      [email]
    );

    if (exist.length > 0)
      return res.status(400).json({ msg: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert employee
    const [result] = await db.query(
      `INSERT INTO employees (name, gender, email, password)
       VALUES (?, ?, ?, ?)`,
      [name, gender, email, hashedPassword]
    );

    const emp_id = result.insertId;
    const year = new Date().getFullYear();

    // Create default leave balance
    await db.query(
      `INSERT INTO leave_balance
       (emp_id, year, total_leaves, carry_forward, used_leaves, maternity_total, maternity_used)
       VALUES (?, ?, 20, 0, 0, 90, 0)`,
      [emp_id, year]
    );

    return res.status(201).json({
      msg: "Registration successful",
      emp_id
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};