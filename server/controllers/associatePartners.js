const db = require("../config/db");
const { message } = require("../utils/messgae");
const Sendmail = require("../utils/Sendmail");

exports.getAllAssociatePartners = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM associate_partners");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching associate partners:", error);
    return res
      .status(500)
      .json({ message: "Error fetching associate partners", error });
  }
};

exports.getAssociatePartnerById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM associate_partners WHERE partner_id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Associate partner not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching associate partner by ID:", error);
    return res
      .status(500)
      .json({ message: "Error fetching associate partner", error });
  }
};

exports.createAssociatePartner = async (req, res) => {
  const { partner_name, email, password, phone, address, status } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO associate_partners (partner_name, email, password,phone,address,status) VALUES (?, ?, ?,?,?,?)",
      [partner_name, email, password, phone, address, status]
    );

    // generate message and send email
    const msg = message(
      "Associate Partner",
      email,
      password,
      "http://example.com/login"
    );
    Sendmail(email, "Associate Partner Account Created", msg);

    res
      .status(201)
      .json({ message: "Associate partner created", id: result.insertId });
  } catch (error) {
    console.error("Error creating associate partner:", error);
    return res
      .status(500)
      .json({ message: "Error creating associate partner", error });
  }
};

exports.updateAssociatePartner = async (req, res) => {
  const { id } = req.params;
  const { partner_name, email, password, phone, address, status } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE associate_partners SET partner_name = ?, email = ?,password=?, phone = ?,address=?,status=? WHERE partner_id = ?",
      [partner_name, email, password, phone, address, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Associate partner not found" });
    }
    res.status(200).json({ message: "Associate partner updated" });
  } catch (error) {
    console.error("Error updating associate partner:", error);
    return res
      .status(500)
      .json({ message: "Error updating associate partner", error });
  }
};
