const db = require("../../config/db");

exports.getProjectCount = async (req, res) => {
  const id = req.params.id;
  try {
    const [data] = await db.query(
      `select * from projects where client_id=${id}`
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
      `select * from projects where client_id=${id}`
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
      `select * from projects where client_id=${id}`
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
