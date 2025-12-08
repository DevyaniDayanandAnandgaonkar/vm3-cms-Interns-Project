// const bcrypt = require('bcryptjs');
// const db = require('../config/db');

// // Create a new client
// exports.createClient = async (req, res) => {
//   const { client_name, email, password, phone, address, status, document_type, document_file } = req.body;

//   try {
//     // Basic validation
//     if (!client_name || !email) {
//       return res.status(400).json({ message: 'client_name and email are required' });
//     }

//     // Optional: hash password if provided
//     let hashedPassword = null;
//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     const q = `INSERT INTO clients (client_name, email, password, phone, address, status, document_type, document_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
//     const params = [client_name, email, hashedPassword, phone || null, address || null, status || 'Active', document_type || null, document_file || null];

//     const [result] = await db.query(q, params);

//     res.status(201).json({ message: 'Client created successfully', client_id: result.insertId });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating client', error });
//   }
// };

// // Update an existing client
// exports.updateClient = async (req, res) => {
//   const clientId = req.params.id;
//   const { client_name, email, password, phone, address, status, document_type, document_file } = req.body;

//   try {
//     // Check if client exists
//     const [rows] = await db.query('SELECT * FROM clients WHERE client_id = ?', [clientId]);
//     if (rows.length === 0) return res.status(404).json({ message: 'Client not found' });

//     const updates = [];
//     const params = [];

//     if (client_name !== undefined) { updates.push('client_name = ?'); params.push(client_name); }
//     if (email !== undefined) { updates.push('email = ?'); params.push(email); }
//     if (password !== undefined) { const hp = await bcrypt.hash(password, 10); updates.push('password = ?'); params.push(hp); }
//     if (phone !== undefined) { updates.push('phone = ?'); params.push(phone); }
//     if (address !== undefined) { updates.push('address = ?'); params.push(address); }
//     if (status !== undefined) { updates.push('status = ?'); params.push(status); }
//     if (document_type !== undefined) { updates.push('document_type = ?'); params.push(document_type); }
//     if (document_file !== undefined) { updates.push('document_file = ?'); params.push(document_file); }

//     if (updates.length === 0) {
//       return res.status(400).json({ message: 'No fields provided for update' });
//     }

//     const q = `UPDATE clients SET ${updates.join(', ')} WHERE client_id = ?`;
//     params.push(clientId);

//     await db.query(q, params);

//     res.json({ message: 'Client updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating client', error });
//   }
// };

const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { message } = require("../utils/messgae");

// Create a new client
exports.createClient = async (req, res) => {
  const {
    client_name,
    email,
    password,
    phone,
    address,
    status,
    document_type,
    document_file,
  } = req.body;

  try {
    if (!client_name || !email) {
      return res
        .status(400)
        .json({ message: "client_name and email are required" });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const q = `
      INSERT INTO clients 
      (client_name, email, password, phone, address, status, document_type, document_file) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      client_name,
      email,
      hashedPassword,
      phone || null,
      address || null,
      status || "Active",
      document_type || null,
      document_file || null,
    ];

    const [result] = await db.query(q, params);

    const msg = message("Client", email, password, "http://example.com/login");
    Sendmail(email, "Client Account Created", msg);

    res.status(201).json({
      message: "Client created successfully",
      client_id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error });
  }
};

// Update an existing client
exports.updateClient = async (req, res) => {
  const clientId = req.params.id;
  const {
    client_name,
    email,
    password,
    phone,
    address,
    status,
    document_type,
    document_file,
  } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM clients WHERE client_id = ?", [
      clientId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    const updates = [];
    const params = [];

    if (client_name !== undefined) {
      updates.push("client_name = ?");
      params.push(client_name);
    }
    if (email !== undefined) {
      updates.push("email = ?");
      params.push(email);
    }
    if (password !== undefined) {
      const hashed = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      params.push(hashed);
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
    if (document_type !== undefined) {
      updates.push("document_type = ?");
      params.push(document_type);
    }
    if (document_file !== undefined) {
      updates.push("document_file = ?");
      params.push(document_file);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const q = `UPDATE clients SET ${updates.join(", ")} WHERE client_id = ?`;
    params.push(clientId);

    await db.query(q, params);

    res.json({ message: "Client updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};
