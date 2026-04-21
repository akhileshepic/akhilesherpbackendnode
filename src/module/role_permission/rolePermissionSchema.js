const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
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

rolePermissionSchema.index({ role: 1, module: 1 }, { unique: true });

module.exports = mongoose.model("RolePermission", rolePermissionSchema);
