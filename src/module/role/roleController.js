const { createRole: createRoleService } = require("./roleService");

const createRole = async (req, res) => {
  try {
    const { name } = req.body || {};
    console.log("Received role creation request with name:", req.body);
    if (!name) {
      return res.status(400).json({ message: "Role name is required" });
    }
    const newRole = await createRoleService({ name });
    res
      .status(201)
      .json({ message: "Role created successfully", data: newRole });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = {
  createRole,
};
