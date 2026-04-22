const mongoose = require("mongoose");

const departmentSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    }
},{ timestamps: true },)

module.exports = mongoose.model('Department',departmentSchema);