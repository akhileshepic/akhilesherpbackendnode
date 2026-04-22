const {createandUpdateStaffRole:createandUpdateStaffRoleService} = require("./StaffRoleService")

const createrolestaff = async (req,res) =>{
    try {
        const data= req.body;
        const createnew =await createandUpdateStaffRoleService(data);
          res.status(201).json({ message: "Staff created successfully", data: createnew });
        
    } catch (error) {
          console.error("Error creating staff:", error.message);
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
}

module.exports = {createrolestaff}