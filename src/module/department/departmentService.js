const departmentModel = require("./departmentSchema");
const mongoose = require("mongoose");
const createDepartment = async (data) => {
  if (!data || !data.name) {
    throw new Error("Name is required");
  }
  const existingdepartment = await departmentModel.findOne({ name: data.name });
  if (existingdepartment) {
    throw new Error("Department with this name already exists");
  }
const newDepartment = new departmentModel({name: data.name});
  return await newDepartment.save();
};

const getallDepartment = async () => {
  const getalldepatment = await departmentModel.find({});
  return getalldepatment;
};

const updatedepartment = async (id, data) => {
  if (!id) {
    throw new Error("Id is required");
  }
  if (!data || !data.name) {
    throw new Error("Name is required");
  }
  const updatedDepartment = await departmentModel.findByIdAndUpdate(
    id,
    { name: data.name },
    { new: true },
  );
  if (!updatedDepartment) {
    throw new Error("Department Id not found");
  }
  return updatedDepartment;
};

const deleteDepartment= async (id)=>{
   if (!id) {
      throw new Error("Department id is required");
    }
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid department id");
    }

    deletedepartment= await departmentModel.findOneAndDelete(id);
    if (!deletedepartment) {
    throw new Error("Department not found");
  }

  return deletedepartment;
}
module.exports = { createDepartment, getallDepartment, updatedepartment,deleteDepartment };
