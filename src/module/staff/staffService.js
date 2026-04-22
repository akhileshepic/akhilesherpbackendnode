const staffModel = require("./staffSchema");
const bcrypt = require("bcryptjs");
const {
  createandUpdateStaffRole,
  getbystaffRole,
} = require("../staff_role/StaffRoleService");

const createStaff = async (data) => {
  const existingStaff = await staffModel.findOne({ email: data.email });

  if (existingStaff) {
    throw new Error("Staff with this email already exists");
  }

  const assignedRoleId = data.role_id || data.roleId;
  const staffData = { ...data };
  delete staffData.role_id;
  delete staffData.roleId;

  if (!staffData.employee_id) {
    staffData.employee_id = await generateEmployeeId();
  }

  const newStaff = await staffModel.create(staffData);

  if (assignedRoleId) {
    try {
      await createandUpdateStaffRole({
        staffId: newStaff._id,
        roleId: assignedRoleId,
      });
    } catch (error) {
      await staffModel.findByIdAndDelete(newStaff._id).catch(() => null);
      throw error;
    }
  }

  return newStaff;
};

const generateEmployeeId = async () => {
  const lastStaff = await staffModel
    .findOne({})
    .sort({ createdAt: -1 })
    .select("employee_id");

  let newEmployeeId = "EMP001";

  if (lastStaff && lastStaff.employee_id) {
    const lastNumber = parseInt(lastStaff.employee_id.replace("EMP", ""), 10);
    const nextNumber = lastNumber + 1;
    newEmployeeId = "EMP" + String(nextNumber).padStart(3, "0");
  }

  return newEmployeeId;
};

const loginStaff = async (email, password) => {
  const staff = await staffModel.findOne({ email });

  if (!staff) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, staff.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const staffRoleData = await getbystaffRole(staff._id);
  const staffData = staff.toObject();
  delete staffData.password;

  return {
    staff: staffData, 
    role: staffRoleData?.role ?? null,
    modules: staffRoleData?.modules ?? [],
  };
};

module.exports = {
  createStaff,
  loginStaff,
};
