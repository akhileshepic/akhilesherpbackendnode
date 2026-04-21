const router = require("express").Router();
const {
  createRolePermission,
  getAllRolePermissions,
  getRolePermissionsByRole,
  deleteRolePermission,
} = require("./rolePermissionController");

router.post("/create", createRolePermission);
router.get("/all", getAllRolePermissions);
router.get("/role/:roleId", getRolePermissionsByRole);
router.delete("/:id", deleteRolePermission);

module.exports = router;
