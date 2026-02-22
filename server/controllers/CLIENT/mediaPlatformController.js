// controllers/CLIENT/mediaPlatformController.js
const db = require("../../config/db");

/**
 * GET /client/media-platforms
 * Fetch all media platform profiles for the logged-in client
 */
exports.getMediaPlatforms = async (req, res) => {
    try {
        const clientId = req.client.client_id;

        const [rows] = await db.query(
            `SELECT id, client_id, platform, account_type, username, password
             FROM media_platform
             WHERE client_id = ?
             ORDER BY id DESC`,
            [clientId]
        );

        return res.status(200).json({ success: true, platforms: rows });
    } catch (error) {
        console.error("Get media platforms error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * POST /client/media-platforms
 * Add a new media platform profile
 */
exports.addMediaPlatform = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { platform, account_type, username, password } = req.body;

        if (!platform || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Platform, username, and password are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO media_platform (client_id, platform, account_type, username, password)
             VALUES (?, ?, ?, ?, ?)`,
            [clientId, platform, account_type || null, username, password]
        );

        return res.status(201).json({
            success: true,
            message: "Media platform added successfully",
            id: result.insertId
        });
    } catch (error) {
        console.error("Add media platform error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * PUT /client/media-platforms/:id
 * Update an existing media platform profile
 */
exports.updateMediaPlatform = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { id } = req.params;
        const { platform, account_type, username, password } = req.body;

        if (!platform || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Platform, username, and password are required"
            });
        }

        // Verify record belongs to this client
        const [rows] = await db.query(
            `SELECT id FROM media_platform WHERE id = ? AND client_id = ?`,
            [id, clientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Media platform not found" });
        }

        await db.query(
            `UPDATE media_platform
             SET platform = ?, account_type = ?, username = ?, password = ?
             WHERE id = ? AND client_id = ?`,
            [platform, account_type || null, username, password, id, clientId]
        );

        return res.status(200).json({ success: true, message: "Media platform updated successfully" });
    } catch (error) {
        console.error("Update media platform error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * DELETE /client/media-platforms/:id
 * Delete a media platform profile
 */
exports.deleteMediaPlatform = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { id } = req.params;

        // Verify record belongs to this client
        const [rows] = await db.query(
            `SELECT id FROM media_platform WHERE id = ? AND client_id = ?`,
            [id, clientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Media platform not found" });
        }

        await db.query(
            `DELETE FROM media_platform WHERE id = ? AND client_id = ?`,
            [id, clientId]
        );

        return res.status(200).json({ success: true, message: "Media platform deleted successfully" });
    } catch (error) {
        console.error("Delete media platform error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
