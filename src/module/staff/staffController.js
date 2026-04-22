const { createStaff: createStaffService } = require("./staffService");
const bcryptjs = require("bcryptjs");
const createStaff = async (req, res) => {
    try {
        const { name, email, password, role } = req.body; 
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newStaff = await createStaffService({ name,surname,father_name,mother_name,contact_no,emergency_contact_no,dob,department,designation,qualification,work_exp,marital_status,date_of_joining,date_of_leaving,local_address,permanent_address,note,gender,account_title,bank_account_no,bank_name,ifsc_code,bank_branch,payscale,basic_salary,epf_no,email, password: hashedPassword, role });
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
