const staffModel = require("./staffSchema");
const { createandUpdateStaffRole } = require("../staff_role/StaffRoleService");
const createStaff = async (data) => {
  const existingStaff = await staffModel.findOne({ email: data.email });
  if (existingStaff) {
    throw new Error("Staff with this email already exists");
  }
  if (!data.employee_id) {
    data.employee_id = await generateEmployeeId();
  }
  const {role_id,...staffdata} = data;
  const newStaffd = new staffModel(staffdata);

  const newStaff = await newStaffd.save();
   console.log(newStaff,'newStaff');
  // ✅ Role assign after save
  if (data.role_id) {
    await createandUpdateStaffRole({
      staffId: newStaff._id,
      roleId: role_id, 
    });
  }

  return newStaff;
};
const generateEmployeeId = async () => {
  // 🔍 Last staff find karo
  const lastStaff = await staffModel
    .findOne({})
    .sort({ createdAt: -1 })
    .select("employee_id");
  let newEmployeeId = "EMP001";
  if (lastStaff && lastStaff.employee_id) {
    const lastNumber = parseInt(lastStaff.employee_id.replace("EMP", ""));
    console.log(lastNumber, "lastNumber");
    const nextNumber = lastNumber + 1;

    newEmployeeId = "EMP" + String(nextNumber).padStart(3, "0");
  }

  return newEmployeeId;
};

module.exports = {
  createStaff,
};
