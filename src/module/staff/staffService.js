const staffModel = require("./staffSchema");

const createStaff = async ({ name, email, password, role }) => {
    const existingStaff = await staffModel.findOne({ email });
    if (existingStaff) {
        throw new Error("Staff with this email already exists");
    }       
    const newStaff = new staffModel({ name,name,surname,father_name,mother_name,contact_no,emergency_contact_no,dob,department,designation,qualification,work_exp,marital_status,date_of_joining,date_of_leaving,local_address,permanent_address,note,gender,account_title,bank_account_no,bank_name,ifsc_code,bank_branch,payscale,basic_salary,epf_no,email, password });
    return await newStaff.save();
};

module.exports = {
    createStaff,
};
