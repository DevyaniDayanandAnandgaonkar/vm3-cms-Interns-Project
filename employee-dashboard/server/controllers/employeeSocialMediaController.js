const db = require("../config/db");

// GET all active clients (for dropdown)
exports.getClients = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT client_id, client_name FROM clients WHERE status = 'Active' ORDER BY client_name ASC`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error("GET CLIENTS ERROR:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// GET all posts for the logged-in employee's clients
exports.getPosts = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT p.post_id, p.client_id, c.client_name, p.platform, p.media_type,
              p.media_url, p.content, p.schedule_date, p.status,
              p.rejected_reason, p.created_date
       FROM social_media_posts p
       LEFT JOIN clients c ON c.client_id = p.client_id
       ORDER BY p.created_date DESC`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error("GET POSTS ERROR:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// GET single post by id
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            `SELECT p.post_id, p.client_id, c.client_name, p.platform, p.media_type,
              p.media_url, p.content, p.schedule_date, p.status,
              p.rejected_reason, p.created_date
       FROM social_media_posts p
       LEFT JOIN clients c ON c.client_id = p.client_id
       WHERE p.post_id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error("GET POST BY ID ERROR:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// CREATE a new post
exports.createPost = async (req, res) => {
    try {
        const { client_id, platform, media_type, media_url, content, schedule_date } = req.body;

        const [result] = await db.query(
            `INSERT INTO social_media_posts
        (client_id, platform, media_type, media_url, content, schedule_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [client_id, platform, media_type, media_url || null, content || null, schedule_date]
        );

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: { post_id: result.insertId }
        });
    } catch (error) {
        console.error("CREATE POST ERROR:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// UPDATE a post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { client_id, platform, media_type, media_url, content, schedule_date } = req.body;

        const [result] = await db.query(
            `UPDATE social_media_posts
       SET client_id = ?, platform = ?, media_type = ?, media_url = ?,
           content = ?, schedule_date = ?
       WHERE post_id = ?`,
            [client_id, platform, media_type, media_url || null, content || null, schedule_date, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.json({ success: true, message: "Post updated successfully" });
    } catch (error) {
        console.error("UPDATE POST ERROR:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// DELETE a post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            `DELETE FROM social_media_posts WHERE post_id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("DELETE POST ERROR:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// PATCH – update status (APPROVE / REJECT)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, rejected_reason } = req.body;

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return res.status(400).json({ success: false, message: "Status must be APPROVED or REJECTED" });
        }

        const [result] = await db.query(
            `UPDATE social_media_posts
       SET status = ?, rejected_reason = ?
       WHERE post_id = ?`,
            [status, status === "REJECTED" ? rejected_reason : null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.json({ success: true, message: `Post ${status.toLowerCase()} successfully` });
    } catch (error) {
        console.error("UPDATE STATUS ERROR:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
