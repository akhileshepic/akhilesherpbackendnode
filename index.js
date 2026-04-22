const exprss = require("express");
const cors = require("cors");
const app = exprss();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const dbConnect = require("./src/config/db");
const userRoute = require("./src/module/user/userRoute");
const roleRoute = require("./src/module/role/roleRoute");
const moduleRoute = require("./src/module/Module/moduleRoute");
const permissionRoute = require("./src/module/permission/permissionRoute");
const rolePermissionRoute = require("./src/module/role_permission/rolePermissionRoute");
const departmentRoute = require("./src/module/department/departmentRoute")
const staffRoute = require("./src/module/staff/staffRoute");
const rolestaffRoute = require('./src/module/staff_role/StaffRoleRoute')
dbConnect();



app.use(cors());

app.use(exprss.json()); 
app.use(exprss.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
}
);

app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);
app.use("/api/module", moduleRoute);
app.use("/api/permission", permissionRoute);
app.use("/api/role-permission", rolePermissionRoute);
app.use("/api/staff",staffRoute);
app.use("/api/department",departmentRoute);
app.use("/api/staff-role",rolestaffRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
