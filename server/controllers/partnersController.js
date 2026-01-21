const bcrypt = require("bcryptjs");
const db = require("../config/db");

const { message } = require("../utils/messgae");
const Sendmail = require("../utils/Sendmail");

// Get all partners
exports.getAllPartners = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM associate_partners");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partners", error });
  }
};

// Create a new partner
exports.createPartner = async (req, res) => {
  const { partner_name, email, password, phone, address, status } = req.body;

  try {
    // Basic validation
    if (!partner_name || !email) {
      return res
        .status(400)
        .json({ message: "partner_name and email are required" });
    }

    // Optional: hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const q = `INSERT INTO associate_partners (partner_name, email, password, phone, address, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
      partner_name,
      email,
      hashedPassword,
      phone || null,
      address || null,
      status || "Active",
    ];

    const [result] = await db.query(q, params);

    // generate message and send email
    const msg = message(
      "Associate Partner",
      email,
      password,
      "http://example.com/login"
    );
    Sendmail(email, "Associate Partner Account Created", msg);
    const [newPartner] = await db.query(
      "SELECT * FROM associate_partners WHERE partner_id = ?",
      [result.insertId]
    );

    res.status(201).json(newPartner[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating partner", error });
  }
};

// Update an existing partner
exports.updatePartner = async (req, res) => {
  const partnerId = req.params.id;
  const { partner_name, email, password, phone, address, status } = req.body;

  try {
    // Check if partner exists
    const [rows] = await db.query(
      "SELECT * FROM associate_partners WHERE partner_id = ?",
      [partnerId]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Partner not found" });

    const updates = [];
    const params = [];

    if (partner_name !== undefined) {
      updates.push("partner_name = ?");
      params.push(partner_name);
    }
    if (email !== undefined) {
      updates.push("email = ?");
      params.push(email);
    }
    if (password !== undefined) {
      const hp = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      params.push(hp);
    }
    if (phone !== undefined) {
      updates.push("phone = ?");
      params.push(phone);
    }
    if (address !== undefined) {
      updates.push("address = ?");
      params.push(address);
    }
    if (status !== undefined) {
      updates.push("status = ?");
      params.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const q = `UPDATE associate_partners SET ${updates.join(
      ", "
    )} WHERE partner_id = ?`;
    params.push(partnerId);

    await db.query(q, params);

    const [updatedPartner] = await db.query(
      "SELECT * FROM associate_partners WHERE partner_id = ?",
      [partnerId]
    );

    res.json(updatedPartner[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating partner", error });
  }
};

// Delete an existing partner
exports.deletePartner = async (req, res) => {
  const partnerId = req.params.id;

  try {
    // Check if partner exists
    const [rows] = await db.query(
      "SELECT * FROM associate_partners WHERE partner_id = ?",
      [partnerId]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Partner not found" });

    const q = `DELETE FROM associate_partners WHERE partner_id = ?`;
    await db.query(q, [partnerId]);

    res.json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting partner", error });
  }
};
