const { createModule: createModulesService,getAllModules:getAllModulesService } = require("./moduleService");

const createModule = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newModule = await createModulesService({ name, description });
    res
      .status(201)
      .json({ message: "Module created successfully", data: newModule });
  } catch (error) {
    console.error("Error creating module:", error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};


const getAllModules = async (req, res) => {
    try {
        const modules = await getAllModulesService();
        res.status(200).json({ data:modules });
    } catch (error) {
        console.error("Error fetching modules:", error.message);
        res.status(500).json({ message: error.message || "Internal server error" });
    }   

}

module.exports = {
  createModule,
  getAllModules

};
