// controllers/clientAuthController.js
const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = "7d";

/**
 * POST /api/client-auth/login
 * Body: { email, password }
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ── Validate input ───────────────────────────────────────
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // ── Find client by email ─────────────────────────────────
        const [rows] = await db.query("SELECT * FROM clients WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const client = rows[0];

        // ── Check if client is active ────────────────────────────
        if (client.status !== "Active") {
            return res.status(403).json({ success: false, message: "Your account is inactive. Please contact admin." });
        }

        // ── Check if password is set ─────────────────────────────
        if (!client.password) {
            return res.status(403).json({ success: false, message: "Password not set. Please contact admin to set your password." });
        }

        // ── Compare password ─────────────────────────────────────
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // ── Generate JWT token ───────────────────────────────────
        const payload = {
            client_id: client.client_id,
            email: client.email,
            client_name: client.client_name,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // ── Return response (exclude password) ───────────────────
        const { password: _pw, ...clientData } = client;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            client: clientData,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * GET /api/client-auth/profile
 * Protected — requires JWT via authMiddleware
 */
exports.getProfile = async (req, res) => {
    try {
        const clientId = req.client.client_id;

        const [rows] = await db.query(
            "SELECT client_id, client_name, email, phone, address, status, document_type, document_file, contact_person_name, website_url, domain_provider, website_username, website_email, otp_enabled, logo_url, brand_colors, kyc_verified FROM clients WHERE client_id = ?",
            [clientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        return res.status(200).json({ success: true, client: rows[0] });
    } catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
