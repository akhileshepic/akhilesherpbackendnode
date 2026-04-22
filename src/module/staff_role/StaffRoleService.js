const mongoose = require("mongoose");
const StaffRoleModel = require("./StaffRoleSchema");
const Role = require("../role/roleSchema");
const Staff = require("../staff/staffSchema");
const RolePermissionModel = require("../role_permission/rolePermissionSchema");
const PermissionModel = require("../permission/permissionSchema");
const ModuleModel = require("../Module/moduleSchema");

const createandUpdateStaffRole = async (data) => {
  const roleID = data?.role || data?.roleId;
  const staffID = data?.staff || data?.staffId;

  if (!roleID || !staffID) {
    throw new Error("Role and staff are required");
  }

  if (
    !mongoose.Types.ObjectId.isValid(roleID) ||
    !mongoose.Types.ObjectId.isValid(staffID)
  ) {
    throw new Error("Invalid role or staff id");
  }

  const [roleDoc, staffDoc] = await Promise.all([
    Role.findById(roleID),
    Staff.findById(staffID),
  ]);

  if (!roleDoc) {
    throw new Error("Role not found");
  }

  if (!staffDoc) {
    throw new Error("Staff not found");
  }

  const existingStaffRole = await StaffRoleModel.findOne({ staff: staffID });

  if (existingStaffRole) {
    existingStaffRole.role = roleID;
    const staffrole = await existingStaffRole.save();
    return { staffrole, isUpdated: true };
  }

  const staffrole = await StaffRoleModel.create({
    role: roleID,
    staff: staffID,
  });

  return { staffrole, isUpdated: false };
};

const getbystaffRole = async (staffId) => {
  if (!staffId) {
    throw new Error("Staff id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(staffId)) {
    throw new Error("Invalid staff id");
  }

  const [result] = await StaffRoleModel.aggregate([
    {
      $match: {
        staff: new mongoose.Types.ObjectId(staffId),
      },
    },
    {
      $lookup: {
        from: Role.collection.name,
        localField: "role",
        foreignField: "_id",
        as: "role",
      },
    },
    {
      $unwind: {
        path: "$role",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RolePermissionModel.collection.name,
        let: { roleId: "$role._id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$role", "$$roleId"],
              },
            },
          },
          {
            $lookup: {
              from: ModuleModel.collection.name,
              localField: "module",
              foreignField: "_id",
              as: "module",
            },
          },
          {
            $unwind: {
              path: "$module",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: PermissionModel.collection.name,
              localField: "module._id",
              foreignField: "module",
              as: "permissions",
            },
          },
          {
            $project: {
              _id: 0,
              module: {
                _id: "$module._id",
                name: "$module.name",
                description: "$module.description",
                createdAt: "$module.createdAt",
                updatedAt: "$module.updatedAt",
              },
              access: {
                canview: "$canview",
                canadd: "$canadd",
                canedit: "$canedit",
                candelete: "$candelete",
              },
              permissions: {
                $map: {
                  input: "$permissions",
                  as: "permission",
                  in: {
                    _id: "$$permission._id",
                    name: "$$permission.name",
                     canview: "$canview",
                canadd: "$canadd",
                canedit: "$canedit",
                candelete: "$candelete",
                  },
                },
              },
            },
          },
        ],
        as: "modules",
      },
    },
    {
      $project: {
        _id: 0,
        role: 1,
        modules: 1,
      },
    },
  ]);

  return result || { role: null, modules: [] };
};

module.exports = {
  createandUpdateStaffRole,
  getbystaffRole,
};
 
