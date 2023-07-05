const Router = require("@koa/router");
const {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

const router = Router();

router.post("/add", addAdmin);
router.get("/", getAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = () => router.routes();
