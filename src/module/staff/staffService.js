const staffModel = require("./staffSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createandUpdateStaffRole,
  getbystaffRole,
} = require("../staff_role/StaffRoleService");

const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

const getAccessTokenSecret = () => process.env.JWT_SECRET;
const getRefreshTokenSecret = () =>
  process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

const sanitizeStaff = (staff) => {
  const staffData = staff.toObject();
  delete staffData.password;
  return staffData;
};

const buildStaffAuthResponse = async (staff) => {
  const staffRoleData = await getbystaffRole(staff._id);
  const staffId = staff._id.toString();
  const roleId = staffRoleData?.role?._id
    ? staffRoleData.role._id.toString()
    : null;
  const token = jwt.sign(
    {
      staffId,
      email: staff.email,
      roleId,
      type: "access",
    },
    getAccessTokenSecret(),
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  const refreshToken = jwt.sign(
    {
      staffId,
      type: "refresh",
    },
    getRefreshTokenSecret(),
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );

  return {
    staff: sanitizeStaff(staff),
    role: staffRoleData?.role ?? null,
    modules: staffRoleData?.modules ?? [],
    token,
    refreshToken,
  };
};

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

  return await buildStaffAuthResponse(staff);
};

const refreshStaffToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, getRefreshTokenSecret());
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  if (decoded?.type !== "refresh" || !decoded?.staffId) {
    throw new Error("Invalid refresh token");
  }

  const staff = await staffModel.findById(decoded.staffId);

  if (!staff) {
    throw new Error("Staff not found");
  }

  return await buildStaffAuthResponse(staff);
};

module.exports = {
  createStaff,
  loginStaff,
  refreshStaffToken,
};
