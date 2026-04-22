const {
  createOrUpdateRolePermission: createOrUpdateRolePermissionService,
    getAllRolePermissions: getAllRolePermissionsService,
  getRolePermissionsByRole: getRolePermissionsByRoleService,
   deleteRolePermission: deleteRolePermissionService,
} = require("./rolePermissionService");

const createRolePermission = async (req, res) => {
  try {
    const rolePermissionData = req.body || {};
    const { rolePermission, isUpdated } =
      await createOrUpdateRolePermissionService(rolePermissionData);

    res.status(isUpdated ? 200 : 201).json({
      message: isUpdated
        ? "Role permission updated successfully"
        : "Role permission created successfully",
      data: rolePermission,
    });
  } catch (error) {
    const statusCode =
      error.message.includes("required") ||
      error.message.includes("not found") ||
      error.message.includes("Invalid")
        ? 400
        : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

const getAllRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await getAllRolePermissionsService();
    res.status(200).json({ data: rolePermissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRolePermissionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const rolePermissions = await getRolePermissionsByRoleService(roleId);
    res.status(200).json({ data: rolePermissions });
  } catch (error) {
    const statusCode =
      error.message.includes("required") || error.message.includes("Invalid")
        ? 400
        : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

const deleteRolePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRolePermission = await deleteRolePermissionService(id);
    res.status(200).json({
      message: "Role permission deleted successfully",
      data: deletedRolePermission,
    });
  } catch (error) {
    const statusCode =
      error.message.includes("required") ||
      error.message.includes("not found") ||
      error.message.includes("Invalid")
        ? 400
        : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  createRolePermission,
  getAllRolePermissions,
  getRolePermissionsByRole,
  deleteRolePermission,
};
