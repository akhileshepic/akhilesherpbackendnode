const Permission = require("./permissionSchema");

const createPermission = async (data) => {
  if (!data || !data.module) {
    throw new Error("Module is required");
  }

  const existingPermission = await Permission.findOne({
    module: data.module,
  });

  if (existingPermission) {
    existingPermission.canview = data.canview ?? existingPermission.canview;
    existingPermission.canadd = data.canadd ?? existingPermission.canadd;
    existingPermission.canedit = data.canedit ?? existingPermission.canedit;
    existingPermission.candelete =
      data.candelete ?? existingPermission.candelete;

    const permission = await existingPermission.save();
    return { permission, isUpdated: true };
  }

  const permission = await Permission.create(data);
  return { permission, isUpdated: false };
};

const getAllPermissions = async () => {};

module.exports = {
  createPermission,
  getAllPermissions,
};
