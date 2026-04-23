const {
  createStaff: createStaffService,
  loginStaff: loginStaffService,
  refreshStaffToken: refreshStaffTokenService,
} = require("./staffService");
const bcryptjs = require("bcryptjs");
//===========testing ======//
const staffModel = require("./staffSchema");
const mongoose = require("mongoose");
//=========== endtesting ======//
const getErrorStatusCode = (error) => {
  const message = error?.message || "";

  if (message === "Invalid email or password") {
    return 401;
  }

  if (message === "Invalid refresh token") {
    return 401;
  }

  if (message === "Refresh token is required") {
    return 400;
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

const refreshToken = async (req, res) => {
  try {
    const refreshTokenValue =
      req.body.refreshToken ||
      req.headers["x-refresh-token"] ||
      req.headers.authorization?.replace(/^Bearer\s+/i, "");

    const data = await refreshStaffTokenService(refreshTokenValue);

    res.status(200).json({
      message: "Token refreshed successfully",
      data,
    });
  } catch (error) {
    res.status(getErrorStatusCode(error)).json({
      message: error.message || "Internal server error",
    });
  }
};

const staffagregatefunction = async (req,res) =>{
   try {
        const { id } = req.params;
    const  staff = await staffModel.aggregate([
     {
        $match:{
          _id: new mongoose.Types.ObjectId(id)
        },
      },
      {
        $lookup: {
          from: "staffroles", // collection name small letters me hota hai usually
          localField: "_id",
          foreignField: "staff",
          as: "staffroles"
        }
      },
      {
        $unwind: {
          path: "$staffroles",
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $lookup:{
          from :"roles",
          localField:"staffroles.role",
          foreignField: "_id",
          as: "role"
        }
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "rolepermissions",
          let: { roleId: "$role._id" },
          pipeline:[
            {
              $match: {
                $expr: {
                  $eq: ["$role", "$$roleId"]
                }
              }
            },
            {
              $lookup:{
                from:"modules",
                localField:"module",
                foreignField:"_id",
                as:'module'
              }
            },
            {
              $unwind: {
                path: "$module",
                preserveNullAndEmptyArrays: true,
              },
            },
             {
              $lookup:{
                from:"permissions",
                localField:"module._id",
                foreignField:"module",
                as:'permissions'
              }
            },
            {
              $project: {
                _id: 0,
                module: "$module.name",
                permissions: {
                  $map: {
                    input: "$permissions",
                    as: "p",
                    in: {
                      name: "$$p.name",
                      canview: "$$p.canview",
                      canadd: "$$p.canadd",
                      canedit: "$$p.canedit",
                      candelete: "$$p.candelete"
                    }
                  }
                }
              }
            }
          ],
          as: "rolepermissions"
        }       
      }
   
    ]);

     res.status(200).json({
      message: "Token refreshed successfully",
      staff,
    });
   } catch (error) {
      res.status(getErrorStatusCode(error)).json({
      message: error.message || "Internal server error",
    });
   }
}
module.exports = {
  createStaff,
  loginStaff,
  refreshToken,
  staffagregatefunction,
};
