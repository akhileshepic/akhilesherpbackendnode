const mongoose = require("mongoose");
const Permission = require("./permissionSchema");
const Module = require("../Module/moduleSchema");

const validateModule = async (moduleId) => {
  if (!moduleId) {
    throw new Error("Module is required");
  }

  if (!mongoose.Types.ObjectId.isValid(moduleId)) {
    throw new Error("Invalid module id");
  }

  const moduleDoc = await Module.findById(moduleId);
  if (!moduleDoc) {
    throw new Error("Module not found");
  }

  return moduleDoc;
};

const applyPermissionData = (permission, data) => {
  if (data.name !== undefined) {
    permission.name = data.name;
  }

  if (data.module !== undefined) {
    permission.module = data.module;
  }

  if (data.canview !== undefined) {
    permission.canview = data.canview;
  }

  if (data.canadd !== undefined) {
    permission.canadd = data.canadd;
  }

  if (data.canedit !== undefined) {
    permission.canedit = data.canedit;
  }

  if (data.candelete !== undefined) {
    permission.candelete = data.candelete;
  }
};

const createPermission = async (data) => {
  if (!data) {
    throw new Error("Permission data is required");
  }

  if (!data.name) {
    throw new Error("Name is required");
  }

  if (!data.module) {
    throw new Error("Module is required");
  }

  await validateModule(data.module);

  const existingPermission = await Permission.findOne({
    module: data.module,
    name: data.name,
  });

  if (existingPermission) {
    applyPermissionData(existingPermission, data);

    const permission = await existingPermission.save();
    return { permission, isUpdated: true };
  }

  const permission = await Permission.create({
    name: data.name,
    module: data.module,
    canview: data.canview ?? false,
    canadd: data.canadd ?? false,
    canedit: data.canedit ?? false,
    candelete: data.candelete ?? false,
  });

  return { permission, isUpdated: false };
};

const updatePermission = async (id, data) => {
  if (!id) {
    throw new Error("Permission id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid permission id");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("Permission data is required");
  }

  const permission = await Permission.findById(id);

  if (!permission) {
    throw new Error("Permission not found");
  }

  if (data.name !== undefined && !data.name) {
    throw new Error("Name is required");
  }

  if (data.module !== undefined) {
    await validateModule(data.module);
  }

  const nextName = data.name !== undefined ? data.name : permission.name;
  const nextModule = data.module !== undefined ? data.module : permission.module;

  const duplicatePermission = await Permission.findOne({
    _id: { $ne: id },
    module: nextModule,
    name: nextName,
  });

  if (duplicatePermission) {
    throw new Error("Permission with this module and name already exists");
  }

  applyPermissionData(permission, data);

  const updatedPermission = await permission.save();
  return { permission: updatedPermission, isUpdated: true };
};

const getAllPermissions = async () => {
  return await Permission.find().populate("module");
};

module.exports = {
  createPermission,
  updatePermission,
  getAllPermissions,
};
