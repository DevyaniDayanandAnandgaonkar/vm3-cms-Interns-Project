// controllers/CLIENT/dashboardController.js
const db = require("../../config/db");

/**
 * GET /client/dashboard-summary
 * Returns aggregated dashboard data for the logged-in client:
 *  - project counts by status
 *  - project-by-category breakdown
 *  - recent projects with progress
 *  - social media post counts by status
 */
exports.getDashboardSummary = async (req, res) => {
    try {
        const clientId = req.client.client_id;

        // 1. Project counts by status
        const [projectCounts] = await db.query(
            `SELECT 
                COUNT(*) AS total_projects,
                SUM(CASE WHEN status = 'Working' OR status = 'New Project' THEN 1 ELSE 0 END) AS pending_tasks,
                SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed_tasks,
                SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) AS on_hold_tasks
             FROM projects WHERE client_id = ?`,
            [clientId]
        );

        // 2. Projects grouped by category
        const [projectsByCategory] = await db.query(
            `SELECT c.name AS category_name, COUNT(p.project_id) AS project_count
             FROM projects p
             LEFT JOIN categories c ON p.category_id = c.id
             WHERE p.client_id = ?
             GROUP BY c.name`,
            [clientId]
        );

        // 3. Recent projects with progress
        const [recentProjects] = await db.query(
            `SELECT project_id, project_name, status, Progress as progress, created_at
             FROM projects
             WHERE client_id = ?
             ORDER BY created_at DESC
             LIMIT 5`,
            [clientId]
        );

        // 4. Social media post counts by status
        const [postCounts] = await db.query(
            `SELECT
                COUNT(*) AS total_posts,
                SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending_posts,
                SUM(CASE WHEN status = 'APPROVED' THEN 1 ELSE 0 END) AS approved_posts,
                SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) AS rejected_posts
             FROM social_media_posts WHERE client_id = ?`,
            [clientId]
        );

        return res.status(200).json({
            success: true,
            summary: {
                projectCounts: projectCounts[0],
                projectsByCategory,
                recentProjects,
                postCounts: postCounts[0],
            },
        });
    } catch (error) {
        console.error("Dashboard summary error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
