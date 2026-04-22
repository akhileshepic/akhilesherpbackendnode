const {
  createStaff: createStaffService,
  loginStaff: loginStaffService,
} = require("./staffService");
const bcryptjs = require("bcryptjs");

const getErrorStatusCode = (error) => {
  const message = error?.message || "";

  if (message === "Invalid email or password") {
    return 401;
  }

  if (message.includes("already exists")) {
    return 409;
  }

  if (
    message.includes("required") ||
    message.includes("Invalid") ||
    message.includes("not found")
  ) {
    return 400;
  }

  return 500;
};

const createStaff = async (req, res) => {
  try {
    const data = req.body;

    const hashedPassword = await bcryptjs.hash(data.password, 10);

    const newStaff = await createStaffService({
      ...data,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "Staff created successfully", data: newStaff });
  } catch (error) {
    console.error("Error creating staff:", error.message);
    res.status(getErrorStatusCode(error)).json({
      message: error.message || "Internal server error",
    });
  }
};

const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const data = await loginStaffService(email, password);
    res.status(200).json({
      message: "Login successful",
      data,
    });
  } catch (error) {
    res.status(getErrorStatusCode(error)).json({
      message: error.message || "Internal server error",
    });
  }
};
module.exports = {
  createStaff,
  loginStaff
};
