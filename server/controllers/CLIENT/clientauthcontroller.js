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

/**
 * GET /client/client-profile
 * Protected — returns merged data from clients + client_profile tables
 */
exports.getClientProfileData = async (req, res) => {
    try {
        const clientId = req.client.client_id;

        const [rows] = await db.query(
            `SELECT c.client_id, c.client_name, c.email, c.phone, c.address, c.status,
                    c.document_type, c.document_file, c.contact_person_name,
                    c.website_url, c.domain_provider, c.website_username, c.website_password,
                    c.website_email, c.otp_enabled, c.logo_url, c.brand_colors, c.kyc_verified,
                    cp.company_name, cp.contact_person, cp.contact_no, cp.projects_count
             FROM clients c
             LEFT JOIN client_profile cp ON c.client_id = cp.client_id
             WHERE c.client_id = ?`,
            [clientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        // Exclude password from response
        const { password, ...profileData } = rows[0];

        return res.status(200).json({ success: true, profileData });
    } catch (error) {
        console.error("Get client profile data error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * PUT /client/update-basic-info
 * Protected — updates basic info in both clients and client_profile tables
 */
exports.updateClientBasicInfo = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { company_name, contact_person, email, phone, address } = req.body;

        // Update clients table
        await db.query(
            `UPDATE clients SET client_name = ?, email = ?, phone = ?, address = ?, contact_person_name = ? WHERE client_id = ?`,
            [company_name || null, email || null, phone || null, address || null, contact_person || null, clientId]
        );

        // Upsert client_profile table
        const [existing] = await db.query(
            `SELECT client_profile_id FROM client_profile WHERE client_id = ?`,
            [clientId]
        );

        if (existing.length > 0) {
            await db.query(
                `UPDATE client_profile SET company_name = ?, contact_person = ?, contact_no = ?, email = ?, address = ? WHERE client_id = ?`,
                [company_name || null, contact_person || null, phone || null, email || null, address || null, clientId]
            );
        } else {
            await db.query(
                `INSERT INTO client_profile (client_id, company_name, contact_person, contact_no, email, address) VALUES (?, ?, ?, ?, ?, ?)`,
                [clientId, company_name || null, contact_person || null, phone || null, email || null, address || null]
            );
        }

        return res.status(200).json({ success: true, message: "Basic info updated successfully" });
    } catch (error) {
        console.error("Update basic info error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * PUT /client/update-website-info
 * Protected — updates website-related fields in clients table
 */
exports.updateClientWebsiteInfo = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { website_url, domain_provider, website_username, website_password, website_email, otp_enabled } = req.body;

        await db.query(
            `UPDATE clients SET website_url = ?, domain_provider = ?, website_username = ?, website_password = ?, website_email = ?, otp_enabled = ? WHERE client_id = ?`,
            [website_url || null, domain_provider || null, website_username || null, website_password || null, website_email || null, otp_enabled ?? null, clientId]
        );

        return res.status(200).json({ success: true, message: "Website info updated successfully" });
    } catch (error) {
        console.error("Update website info error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * PUT /client/update-branding
 * Protected — updates logo_url and brand_colors in clients table
 */
exports.updateClientBranding = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { logo_url, brand_colors } = req.body;

        await db.query(
            `UPDATE clients SET logo_url = ?, brand_colors = ? WHERE client_id = ?`,
            [logo_url || null, brand_colors ? JSON.stringify(brand_colors) : null, clientId]
        );

        return res.status(200).json({ success: true, message: "Branding updated successfully" });
    } catch (error) {
        console.error("Update branding error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * PUT /client/change-password
 * Protected — changes the client's password after verifying the current one
 */
exports.changePassword = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { current_password, new_password } = req.body;

        if (!current_password || !new_password) {
            return res.status(400).json({ success: false, message: "Current and new password are required" });
        }

        if (new_password.length < 8) {
            return res.status(400).json({ success: false, message: "New password must be at least 8 characters" });
        }

        // Get current hashed password
        const [rows] = await db.query(
            `SELECT password FROM clients WHERE client_id = ?`,
            [clientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(current_password, rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Current password is incorrect" });
        }

        // Hash and save new password
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await db.query(
            `UPDATE clients SET password = ? WHERE client_id = ?`,
            [hashedPassword, clientId]
        );

        return res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
