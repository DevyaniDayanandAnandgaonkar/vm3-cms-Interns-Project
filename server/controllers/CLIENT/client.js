const db = require("../../config/db");
const bcrypt = require("bcrypt");

exports.getProjectCount = async (req, res) => {
  const id = req.params.id;
  try {
    const [data] = await db.query(
      `select * from projects where client_id=?`,
      [id]
    );
    // const [projectName,description,status,Progress] =data
    // return res.json([projectName,description,status,Progress]);
    console.log(data.length);
    const totalProjectCount = data.length;
    const pendingProjects = data.filter((d) => d.status !== "Completed");
    const completedProjects = data.filter((d) => d.status === "Completed");
    // const newProjects = data.filter((d) => d.status === "New Project");
    const pendingProjectCount = pendingProjects.length;
    const completedProjectCount = completedProjects.length;
    // const newProjectCount = newProjects.length;
    return res.status(200).json([
      {
        "Total Projects": totalProjectCount,
        "Pending Projects": pendingProjectCount,
        "Completed Project": completedProjectCount,
      },
    ]);
  } catch (error) {
    return res.json(error);
  }
};

exports.getProjectByType = async (req, res) => {
  const id = req.params.id;
  try {
    const [data] = await db.query(
      `select * from projects where client_id=?`,
      [id]
    );

    const descriptions = data.map((project) => project.description);
    console.log(descriptions);
    return res.status(200).json(descriptions);
  } catch (error) {
    return res.json(error);
  }
};

exports.getProjectDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const [data] = await db.query(
      `select * from projects where client_id=?`,
      [id]
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.json(error);
  }
};

exports.getCLientInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const [data] = await db.query("select * from clients where client_id=?", [
      id,
    ]);
    return res.status(200).json(data);
  } catch (error) {
    return res.json(error);
  }
};

exports.updateClientInfo = async (req, res) => {
  const id = req.params.id;
  const { client_name, email, phone, address } = req.body;
  try {
    const [data] = await db.query(
      "update clients set client_name=?, email=?, phone=?, address=? where client_id=?",
      [client_name, email, phone, address, id]
    );
    return res
      .status(200)
      .json({ message: "Client info updated successfully" });
  } catch (error) {
    return res.json(error);
  }
};

exports.SendProjectRequest = async (req, res) => {
  const id = req.params.id;
  const { projectName, description, startDate, endDate, budget } = req.body;
  try {
    const [data] = await db.query(
      "insert into project_request (projectName, description, startDate, endDate,budget , client_id) values (?, ?, ?,?, ?, ?)",
      [projectName, description, startDate, endDate, budget, id]
    );
    return res
      .status(200)
      .json({ message: "Project request sent successfully" });
  } catch (error) {
    return res.json(error);
  }
};

exports.createProfile = async (req, res) => {
  let { platform, account_type, username, password } = req.body;
  password = await bcrypt.hash(password, 10);
  const client_id = req.params.id;
  try {
    const [data] = await db.query(
      "insert into media_platform (platform, client_id,account_type, username, password) values (?, ?, ?, ?, ?)",
      [platform, client_id, account_type, username, password]
    );
    return res.status(200).json({ message: "Profile created successfully" });
  } catch (error) {
    return res.json(error);
  }
};

exports.createSocialMediaPost = async (req, res) => {
  const id = req.params.id;
  const { platform, media_type, media_url, content, schedule_date } = req.body;
  try {
    const [data] = await db.query(
      "insert into social_media_posts (platform,client_id, media_type, media_url,   content, schedule_date) values (?, ?, ?, ?, ?, ?)",
      [platform, id, media_type, media_url, content, schedule_date]
    );
    return res
      .status(200)
      .json({ message: "Social media post created successfully" });
  } catch (error) {
    return res.json(error);
  }
};

exports.updateSocialMediaPostApprovalStatus = async (req, res) => {
  const postId = req.params.postId;

  try {
    const [data] = await db.query(
      "update social_media_posts set status=? where post_id=?",
      ["approved", postId]
    );
    return res.status(200).json({
      message: "Social media post approval status updated successfully",
    });
  } catch (error) {
    return res.json(error);
  }
};

exports.rejectSocialMediaPost = async (req, res) => {
  const postId = req.params.postId;
  const { rejected_reason } = req.body;
  try {
    const [data] = await db.query(
      "update social_media_posts set status=?, rejected_reason=? where post_id=?",
      ["rejected", rejected_reason, postId]
    );
    return res.status(200).json({
      message: "Social media post rejection status updated successfully",
    });
  } catch (error) {
    return res.json(error);
  }
};
