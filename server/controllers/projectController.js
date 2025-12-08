const db = require("../config/db");
const nodemailer = require("nodemailer");

// Send Email Function
async function sendStatusEmail(
  clientEmail,
  clientName,
  projectName,
  newStatus
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"VM3 CMS" <${process.env.SMTP_USER}>`,
    to: clientEmail,
    subject: `Project Status Updated: ${projectName}`,
    html: `
      <h2>Hello ${clientName},</h2>
      <p>Your project <b>${projectName}</b> status has been updated.</p>
      <p><b>New Status:</b> ${newStatus}</p>
      <br/>
      <p>Regards,<br>VM3 Solutions</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

exports.updateProjectStatus = async (req, res) => {
  const { project_id, new_status } = req.body;

  try {
    if (!project_id || !new_status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get project + client info
    const [project] = await db.query(
      `SELECT p.project_name, c.client_name, c.email
       FROM projects p 
       JOIN clients c ON p.client_id = c.client_id
       WHERE p.project_id = ?`,
      [project_id]
    );

    if (project.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { project_name, client_name, email } = project[0];

    // UPDATE correct column
    await db.query(`UPDATE projects SET status = ? WHERE project_id = ?`, [
      new_status,
      project_id,
    ]);

    // Send email
    await sendStatusEmail(email, client_name, project_name, new_status);

    res.json({
      message: "Project status updated and email sent successfully",
      new_status,
      project_id,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
