const mongoose = require("mongoose");
const RolePermission = require("./rolePermissionSchema");
const Role = require("../role/roleSchema");
const Module = require("../Module/moduleSchema");

 

// const getAllRolePermissions = async () => {
//   return await RolePermission.find().populate("role").populate("module");
// };

// const getRolePermissionsByRole = async (roleId) => {
//   if (!roleId) {
//     throw new Error("Role id is required");
//   }

//   if (!mongoose.Types.ObjectId.isValid(roleId)) {
//     throw new Error("Invalid role id");
//   }

//   return await RolePermission.find({ role: roleId }).populate("module");
// };

// const deleteRolePermission = async (id) => {
//   if (!id) {
//     throw new Error("Role permission id is required");
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new Error("Invalid role permission id");
//   }

//   const deletedRolePermission = await RolePermission.findByIdAndDelete(id);

//   if (!deletedRolePermission) {
//     throw new Error("Role permission not found");
//   }

//   return deletedRolePermission;
// };

const createOrUpdateRolePermission = async (data) => {
  const roleID = data?.role || data?.roleId;
  const moduleID = data?.module || data?.moduleId;
  if (!roleID || !moduleID) {
    throw new Error("Role and module are required");
  }
  if (
    !mongoose.Types.ObjectId.isValid(roleID) ||
    !mongoose.Types.ObjectId.isValid(moduleID)
  ) {
    throw new Error("Invalid role or module id");
  }
  const [roleDoc, moduleDoc] = await Promise.all([
    Role.findById(roleID),
    Module.findById(moduleID),
  ]);
  if (!roleDoc) {
    throw new Error("Role not found");
  }
  if (!moduleDoc) {
    throw new Error("Module not found");
  }
  const existingRolePermission = await RolePermission.findOne({
    role: roleID,
    module: moduleID,
  });
  if (existingRolePermission) {
    existingRolePermission.canview =
      data.canview ?? existingRolePermission.canview;
    existingRolePermission.canadd =
      data.canadd ?? existingRolePermission.canadd;
    existingRolePermission.canedit =
      data.canedit ?? existingRolePermission.canedit;
    existingRolePermission.candelete =
      data.candelete ?? existingRolePermission.candelete;
    const rolePermission = await existingRolePermission.save();
    return { rolePermission, isUpdated: true };
  }

  const rolePermission = await RolePermission.create({
    role: roleID,
    module: moduleID,
    canview: data.canview ?? false,
    canadd: data.canadd ?? false,
    canedit: data.canedit ?? false,
    candelete: data.candelete ?? false,
  });

  return { rolePermission, isUpdated: false };
};

const getAllRolePermissions = async () => {
  return await RolePermission.find().populate('role').populate('module');
}

const getRolePermissionsByRole = async (data) => {

}
module.exports = {
  createOrUpdateRolePermission,
  getAllRolePermissions,
  getRolePermissionsByRole,
  // deleteRolePermission,
};
