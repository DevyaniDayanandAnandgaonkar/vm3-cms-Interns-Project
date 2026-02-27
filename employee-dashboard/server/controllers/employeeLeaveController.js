// // const db = require("../config/db"); // mysql pool

// // // ================= APPLY LEAVE =================
// // exports.applyLeave = async (req, res) => {
// //   try {
// //     const { leave_type, start_date, end_date, reason } = req.body;
// //     const emp_id = req.user.emp_id;  // ✅ FIXED HERE

// //     if (!leave_type || !start_date || !end_date || !reason) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     const start = new Date(start_date);
// //     const end = new Date(end_date);

// //     const days =
// //       (end - start) / (1000 * 60 * 60 * 24) + 1;

// //     if (days <= 0) {
// //       return res.status(400).json({ message: "Invalid date range" });
// //     }

// //     const year = new Date().getFullYear();

// //     console.log("EMP ID:", emp_id);
// //     console.log("YEAR:", year);
// //     console.log("BALANCE:", balance);



// //     // 1️⃣ Get leave balance
// //     let [balance] = await db.query(
// //       "SELECT * FROM leave_balance WHERE emp_id = ? AND year = ?",
// //       [emp_id, year]
// //     );

// //     // 2️⃣ If not found → Auto create
// //     if (balance.length === 0) {
// //       await db.query(
// //         `INSERT INTO leave_balance 
// //         (emp_id, year, total_leaves, used_leaves, maternity_total, maternity_used)
// //         VALUES (?, ?, 20, 0, 90, 0)`,
// //         [emp_id, year]
// //       );

// //       const result = await db.query(
// //         "SELECT * FROM leave_balance WHERE emp_id = ? AND year = ?",
// //         [emp_id, year]
// //       );

// //       balance = result[0]; // 🔥 Correct assignment
// //     }

// //     // Safety check
// //     if (!balance || balance.length === 0) {
// //       return res.status(400).json({ message: "Leave balance not available" });
// //     }

// //     let available = 0;

// //     // 3️⃣ Check available leaves
// //     if (leave_type === "general") {
// //       available =
// //         balance[0].total_leaves - balance[0].used_leaves;

// //       if (available < days) {
// //         return res.status(400).json({ message: "Not enough general leaves" });
// //       }
// //     }

// //     if (leave_type === "maternity") {
// //       available =
// //         balance[0].maternity_total - balance[0].maternity_used;

// //       if (available < days) {
// //         return res.status(400).json({ message: "Not enough maternity leaves" });
// //       }
// //     }

// //     // 4️⃣ Insert leave request
// //     await db.query(
// //       `INSERT INTO leave_requests 
// //       (emp_id, leave_type, start_date, end_date, days, reason) 
// //       VALUES (?, ?, ?, ?, ?, ?)`,
// //       [emp_id, leave_type, start_date, end_date, days, reason]
// //     );

// //     // 5️⃣ Update leave balance
// //     if (leave_type === "general") {
// //       await db.query(
// //         "UPDATE leave_balance SET used_leaves = used_leaves + ? WHERE emp_id = ? AND year = ?",
// //         [days, emp_id, year]
// //       );
// //     }

// //     if (leave_type === "maternity") {
// //       await db.query(
// //         "UPDATE leave_balance SET maternity_used = maternity_used + ? WHERE emp_id = ? AND year = ?",
// //         [days, emp_id, year]
// //       );
// //     }

// //     return res.json({
// //       success: true,
// //       message: "Leave applied successfully"
// //     });

// //   } catch (error) {
// //     console.log("APPLY LEAVE ERROR:", error);
// //     return res.status(500).json({
// //       message: "Server error",
// //       error: error.message
// //     });
// //   }
// // };


// // // ================= GET MY LEAVES =================
// // exports.getMyLeaves = async (req, res) => {
// //   try {
// //     const emp_id = req.user.id;

// //     const [leaves] = await db.query(
// //       "SELECT * FROM leave_requests WHERE emp_id = ? ORDER BY id DESC",
// //       [emp_id]
// //     );

// //     return res.json({
// //       success: true,
// //       leaves
// //     });

// //   } catch (error) {
// //     console.log("GET LEAVE ERROR:", error);
// //     return res.status(500).json({
// //       message: "Server error",
// //       error: error.message
// //     });
// //   }
// // };
// const db = require("../config/db");

// // ================= APPLY LEAVE =================
// exports.applyLeave = async (req, res) => {
//   try {
//     const { leave_type, start_date, end_date, reason } = req.body;
//     const emp_id = req.user.emp_id;
//     const year = new Date().getFullYear();

//     if (!leave_type || !start_date || !end_date || !reason) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const start = new Date(start_date);
//     const end = new Date(end_date);
//     const days = (end - start) / (1000 * 60 * 60 * 24) + 1;

//     if (days <= 0) {
//       return res.status(400).json({ message: "Invalid date range" });
//     }

//     let result = await db.query(
//       "SELECT * FROM leave_balance WHERE emp_id = ? AND year = ?",
//       [emp_id, year]
//     );

//     let balance = result[0];

//     if (balance.length === 0) {
//       await db.query(
//         `INSERT INTO leave_balance
//         (emp_id, year, total_leaves, used_leaves, maternity_total, maternity_used)
//         VALUES (?, ?, 20, 0, 90, 0)`,
//         [emp_id, year]
//       );

//       const newResult = await db.query(
//         "SELECT * FROM leave_balance WHERE emp_id = ? AND year = ?",
//         [emp_id, year]
//       );

//       balance = newResult[0];
//     }

//     let available = 0;

//     if (leave_type === "general") {
//       available = balance[0].total_leaves - balance[0].used_leaves;
//       if (available < days) {
//         return res.status(400).json({ message: "Not enough general leaves" });
//       }
//     }

//     if (leave_type === "maternity") {
//       available = balance[0].maternity_total - balance[0].maternity_used;
//       if (available < days) {
//         return res.status(400).json({ message: "Not enough maternity leaves" });
//       }
//     }

//     await db.query(
//       `INSERT INTO leave_requests
//       (emp_id, leave_type, start_date, end_date, days, reason)
//       VALUES (?, ?, ?, ?, ?, ?)`,
//       [emp_id, leave_type, start_date, end_date, days, reason]
//     );

//     if (leave_type === "general") {
//       await db.query(
//         "UPDATE leave_balance SET used_leaves = used_leaves + ? WHERE emp_id = ? AND year = ?",
//         [days, emp_id, year]
//       );
//     }

//     if (leave_type === "maternity") {
//       await db.query(
//         "UPDATE leave_balance SET maternity_used = maternity_used + ? WHERE emp_id = ? AND year = ?",
//         [days, emp_id, year]
//       );
//     }

//     return res.json({
//       success: true,
//       message: "Leave applied successfully"
//     });

//   } catch (error) {
//     console.log("APPLY LEAVE ERROR:", error);
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message
//     });
//   }
// };


// // ================= GET MY LEAVES =================
// exports.getMyLeaves = async (req, res) => {
//   try {
//     const emp_id = req.user.emp_id;

//     const [leaves] = await db.query(
//       "SELECT * FROM leave_requests WHERE emp_id = ? ORDER BY id DESC",
//       [emp_id]
//     );

//     return res.json({
//       success: true,
//       leaves
//     });

//   } catch (error) {
//     console.log("GET LEAVE ERROR:", error);
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message
//     });
//   }
// };

// // ================= LEAVE SUMMARY =================
// exports.getLeaveSummary = async (req, res) => {
//   try {
//     const emp_id = req.user.emp_id;
//     const year = new Date().getFullYear();

//     const [balance] = await db.query(
//       "SELECT * FROM leave_balance WHERE emp_id = ? AND year = ?",
//       [emp_id, year]
//     );

//     if (balance.length === 0) {
//       return res.status(400).json({ message: "No leave balance found" });
//     }

//     const b = balance[0];

//     return res.json({
//       success: true,
//       general: {
//         total: b.total_leaves,
//         used: b.used_leaves,
//         remaining: b.total_leaves - b.used_leaves
//       },
//       maternity: {
//         total: b.maternity_total,
//         used: b.maternity_used,
//         remaining: b.maternity_total - b.maternity_used
//       }
//     });

//   } catch (error) {
//     console.log("LEAVE SUMMARY ERROR:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

const db = require("../config/db");


// ================= APPLY LEAVE =================
exports.applyLeave = async (req, res) => {
  try {
    const { leave_type, start_date, end_date, reason } = req.body;
    const emp_id = req.user.emp_id;
    const year = new Date().getFullYear();

    if (!leave_type || !start_date || !end_date || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const start = new Date(start_date);
    const end = new Date(end_date);
    const days = (end - start) / (1000 * 60 * 60 * 24) + 1;

    if (days <= 0) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const [balance] = await db.query(
      "SELECT * FROM leave_balance WHERE emp_id = ? AND year = ?",
      [emp_id, year]
    );

    if (balance.length === 0) {
      return res.status(400).json({ message: "Leave balance not found" });
    }

    let available = 0;

    if (leave_type === "general") {
      available =
        (balance[0].total_leaves + balance[0].carry_forward) -
        balance[0].used_leaves;

      if (available < days) {
        return res.status(400).json({ message: "Not enough general leaves" });
      }
    }

    if (leave_type === "maternity") {
      available =
        balance[0].maternity_total - balance[0].maternity_used;

      if (available < days) {
        return res.status(400).json({ message: "Not enough maternity leaves" });
      }
    }

    // Only insert pending request
    await db.query(
      `INSERT INTO leave_requests
      (emp_id, leave_type, start_date, end_date, days, reason)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [emp_id, leave_type, start_date, end_date, days, reason]
    );

    return res.json({
      success: true,
      message: "Leave request submitted for approval"
    });

  } catch (error) {
    console.log("APPLY LEAVE ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};



// ================= GET MY LEAVES =================
exports.getMyLeaves = async (req, res) => {
  try {
    const emp_id = req.user.emp_id;

    const [leaves] = await db.query(
      "SELECT * FROM leave_requests WHERE emp_id = ? ORDER BY id DESC",
      [emp_id]
    );

    return res.json({
      success: true,
      leaves
    });

  } catch (error) {
    console.log("GET LEAVE ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



// ================= LEAVE SUMMARY =================
exports.getLeaveSummary = async (req, res) => {
  try {
    const emp_id = req.user.emp_id;
    const year = new Date().getFullYear();

    const [balance] = await db.query(
      "SELECT * FROM leave_balance WHERE emp_id = ? AND year = ?",
      [emp_id, year]
    );

    if (balance.length === 0) {
      return res.status(400).json({ message: "No leave balance found" });
    }

    const b = balance[0];

    return res.json({
      success: true,
      general: {
        total: b.total_leaves,
        carry_forward: b.carry_forward,
        used: b.used_leaves,
        remaining:
          (b.total_leaves + b.carry_forward) - b.used_leaves
      },
      maternity: {
        total: b.maternity_total,
        used: b.maternity_used,
        remaining:
          b.maternity_total - b.maternity_used
      }
    });

  } catch (error) {
    console.log("LEAVE SUMMARY ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


