const roleModel = require("./roleSchema");

const createRole = async (roleData) => {
  try {
    const existingRole = await roleModel.findOne({ name: roleData.name });
    if (existingRole) {
      throw new Error("Role with this name already exists");
    }
    const role = new roleModel(roleData);
    return await role.save();
  } catch (error) {
    throw new Error("Error creating role: " + error.message);
  }
};

const getAllRoles = async () => {
  const roles = await roleModel.find({});
  return roles;
};

module.exports = {
  createRole,
  getAllRoles,
};
