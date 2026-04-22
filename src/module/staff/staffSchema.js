const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
     
    },
    father_name: {
      type: String,
     
    },
    mother_name: {
      type: String,
    
    },
    contact_no: {
      type: String,
      required: true,
    },
    emergency_contact_no: {
      type: String,
      
    },
    dob: {
      type: Date,
      required: true,
    },
    employee_id: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    qualification: {
      type: String,
      
    },
    work_exp: {
      type: String,
      required: true,
    },
    marital_status: {
        type: Boolean,
        default: false   // false = Single, true = Married
    },
    date_of_joining:{
        type:Date,        
    },
    date_of_leaving:{
        type:Date,
    },
    local_address:{
     type: String,
    },
    permanent_address:{
      type:String,
    },
    note:{
      type:String,
    },
    image:{
        type:String,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    account_title:{
     type:String,
    },
    bank_account_no:{
     type:String,
    },
    bank_name:{
     type:String,
    },
    ifsc_code:{
      type:String,
    },
    bank_branch:{
      type:String,
    },
    payscale:{
      type:String,
    },
    basic_salary:{
     type:String
    },
    epf_no:{
      type:String
    },    
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Staff", staffSchema);
