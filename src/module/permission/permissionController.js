const {
  createPermission: createServicePermission,
  getAllPermissions: getAllPermissionsService,
} = require("./permissionService");

const createPermission = async (req, res) => {
    try {
        const permissionData = req.body || {};
        const { permission, isUpdated } = await createServicePermission(permissionData);
        res.status(isUpdated ? 200 : 201).json({
            message: isUpdated
                ? "Permission updated successfully"
                : "Permission created successfully",
            permission,
        });
    }     catch (error) {
        const statusCode = error.message === "Module is required" ? 400 : 500;
        res.status(statusCode).json({ error: error.message });
    }
}

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await getAllPermissionsService();
        res.status(200).json({ data: permissions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createPermission,
    getAllPermissions,
}
