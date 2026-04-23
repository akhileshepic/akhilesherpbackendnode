const {
  createPermission: createServicePermission,
  updatePermission: updateServicePermission,
  getAllPermissions: getAllPermissionsService,
} = require("./permissionService");

const getPermissionStatusCode = (message) =>
  message.includes("required") ||
  message.includes("not found") ||
  message.includes("Invalid") ||
  message.includes("already exists")
    ? 400
    : 500;

const createPermission = async (req, res) => {
  try {
    const permissionData = req.body || {};
    const { permission, isUpdated } =
      await createServicePermission(permissionData);
    res.status(isUpdated ? 200 : 201).json({
      message: isUpdated
        ? "Permission updated successfully"
        : "Permission created successfully",
      permission,
    });
  } catch (error) {
    const statusCode = getPermissionStatusCode(error.message || "");
    res.status(statusCode).json({ error: error.message });
  }
};

const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permissionData = req.body || {};
    const { permission } = await updateServicePermission(id, permissionData);

    res.status(200).json({
      message: "Permission updated successfully",
      permission,
    });
  } catch (error) {
    const statusCode = getPermissionStatusCode(error.message || "");
    res.status(statusCode).json({ error: error.message });
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await getAllPermissionsService();
    res.status(200).json({ data: permissions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createPermission,
  updatePermission,
  getAllPermissions,
};
