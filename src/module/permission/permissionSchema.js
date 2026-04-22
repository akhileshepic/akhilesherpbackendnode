const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    canview: {
      type: Boolean,
      default: false,
    },
    canadd: {
      type: Boolean,
      default: false,
    },
    canedit: {
      type: Boolean,
      default: false,
    },
    candelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", permissionSchema);
