const StaffRouteModel = require("./StaffRoleSchema");
const Role = require("../role/roleSchema");
const Staff = require("../staff/staffSchema");
const mongoose = require("mongoose");
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

  // ✅ FIXED Promise.all
  const [roleDoc, staffDoc] = await Promise.all([
    Role.findById(roleID),
    Staff.findById(staffID),
  ]);

  if (!roleDoc) throw new Error("Role not found");
  if (!staffDoc) throw new Error("Staff not found");

  // ✅ Create staff role
  const staffrole = await StaffRouteModel.create({
    role: roleID,
    staff: staffID,
  });

  return { staffrole, isUpdated: false };
};

module.exports = { createandUpdateStaffRole };
 