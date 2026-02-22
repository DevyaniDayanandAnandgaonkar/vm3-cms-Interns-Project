// controllers/CLIENT/socialMediaPostsController.js
const db = require("../../config/db");

/**
 * GET /client/social-media-posts
 * Protected — fetches all social media posts for the logged-in client
 */
exports.getClientPosts = async (req, res) => {
    try {
        const clientId = req.client.client_id;

        const [rows] = await db.query(
            `SELECT post_id, client_id, platform, media_type, media_url, content,
                    schedule_date, status, rejected_reason, created_date
             FROM social_media_posts
             WHERE client_id = ?
             ORDER BY created_date DESC`,
            [clientId]
        );

        return res.status(200).json({ success: true, posts: rows });
    } catch (error) {
        console.error("Get client posts error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * PUT /client/social-media-posts/:postId/approve
 * Protected — client approves a post
 */
exports.approvePost = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { postId } = req.params;
        const { rejected_reason } = req.body;

        // Verify post belongs to this client
        const [rows] = await db.query(
            `SELECT post_id FROM social_media_posts WHERE post_id = ? AND client_id = ?`,
            [postId, clientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        await db.query(
            `UPDATE social_media_posts SET status = 'APPROVED', rejected_reason = ? WHERE post_id = ?`,
            [rejected_reason || null, postId]
        );

        return res.status(200).json({ success: true, message: "Post approved successfully" });
    } catch (error) {
        console.error("Approve post error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * PUT /client/social-media-posts/:postId/reject
 * Protected — client rejects a post with a reason
 */
exports.rejectPost = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const { postId } = req.params;
        const { rejected_reason } = req.body;

        if (!rejected_reason || !rejected_reason.trim()) {
            return res.status(400).json({ success: false, message: "Rejection reason is required" });
        }

        // Verify post belongs to this client
        const [rows] = await db.query(
            `SELECT post_id FROM social_media_posts WHERE post_id = ? AND client_id = ?`,
            [postId, clientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        await db.query(
            `UPDATE social_media_posts SET status = 'REJECTED', rejected_reason = ? WHERE post_id = ?`,
            [rejected_reason, postId]
        );

        return res.status(200).json({ success: true, message: "Post rejected successfully" });
    } catch (error) {
        console.error("Reject post error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
