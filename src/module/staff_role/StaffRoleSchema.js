const mongoose = require("mongoose");

const StaffRouteSchema = new mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  staff:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Staff",
    required:true,
  },
},{timestamps:true});

module.exports=mongoose.model('StaffRoute',StaffRouteSchema)
