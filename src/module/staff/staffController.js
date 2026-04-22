const { createStaff: createStaffService } = require("./staffService");
const bcryptjs = require("bcryptjs");
const createStaff = async (req, res) => {
    try {
         const data = req.body;
     
        const hashedPassword = await bcryptjs.hash(data.password, 10);
        console.log(hashedPassword);
        const newStaff = await createStaffService({...data,password: hashedPassword});
        res.status(201).json({ message: "Staff created successfully", data: newStaff });
    } catch (error) {
        console.error("Error creating staff:", error.message);
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

module.exports = {
    createStaff,
};
