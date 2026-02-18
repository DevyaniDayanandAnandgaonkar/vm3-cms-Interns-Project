// controllers/projectController.js
const db = require("../../config/db");

/**
 * GET /api/projects
 * Returns all projects belonging to the logged-in client.
 * The client_id is extracted from the JWT token via authMiddleware.
 */
exports.getClientProjects = async (req, res) => {
    try {
        const clientId = req.client.client_id;

        const [rows] = await db.query(
            `SELECT 
        p.project_id,
        p.project_name,
        p.description,
        p.category_id,
        p.client_id,
        p.department_id,
        p.assigned_to,
        p.status,
        p.created_by,
        p.created_at,
        p.Progress
      FROM projects p
      WHERE p.client_id = ?
      ORDER BY p.created_at DESC`,
            [clientId]
        );

        return res.status(200).json({
            success: true,
            count: rows.length,
            projects: rows,
        });
    } catch (error) {
        console.error("Get client projects error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * GET /api/projects/:id
 * Returns a single project by project_id, only if it belongs to the logged-in client.
 */
exports.getProjectById = async (req, res) => {
    try {
        const clientId = req.client.client_id;
        const projectId = req.params.id;

        const [rows] = await db.query(
            `SELECT 
        p.project_id,
        p.project_name,
        p.description,
        p.category_id,
        p.client_id,
        p.department_id,
        p.assigned_to,
        p.status,
        p.created_by,
        p.created_at,
        p.Progress
      FROM projects p
      WHERE p.project_id = ? AND p.client_id = ?`,
            [projectId, clientId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        return res.status(200).json({ success: true, project: rows[0] });
    } catch (error) {
        console.error("Get project by ID error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
