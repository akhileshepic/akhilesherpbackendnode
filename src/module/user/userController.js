const { createUser: createUserService } = require("./userService");
const bcryptjs = require("bcryptjs");
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body; 
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await createUserService({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

module.exports = {
    createUser,
};
