const userModel = require("./userSchema");

 

const createUser = async ({ name, email, password, role }) => {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }       
    const newUser = new userModel({ name, email, password, role });
    return await newUser.save();
};

module.exports = {
    createUser,
};
