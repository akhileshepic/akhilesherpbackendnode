const {
  createDepartment: createDepartmentService,
  getallDepartment: getallDepartmentServices,
  updatedepartment: updatedepartmentServices,
  deleteDepartment: deleteDepartmentServices,
} = require("./departmentService");

const createDepartment = async (req, res) => {
  try {
    const newdepartment = await createDepartmentService(req.body);
    res.status(201).json({
      message: "Department created successfully",
      data: newdepartment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const getallDepartment = async (req, res) => {
  try {
    const getalldepartment = await getallDepartmentServices();
    return res.status(200).json({ data: getalldepartment });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const updatedDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatenewdata = await updatedepartmentServices(id, req.body);
    res
      .status(201)
      .json({
        message: "Department updated successfully",
        data: updatenewdata,
      });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const deleteDepartment = async (req,res)=>{
  try {
    const {id} = req.params;
    deletedepartment= await deleteDepartmentServices(id);
     res.status(200).json({
      message: "Department deleted successfully",
      data: deletedepartment,
    });
  } catch (error) {
     res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}
module.exports = {
  createDepartment,
  getallDepartment,
  updatedDepartment,
  deleteDepartment
};
