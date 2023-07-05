const Router = require("@koa/router");
const clientRoutes = require("./client.routes");
const adminRoutes = require("./admin.routes");
const serviceRoutes = require("./service.routes");

const router = Router();

router.use(["/api/client", "/api/user"], clientRoutes());
router.use("/api/admin", adminRoutes())
router.use("/api/service", serviceRoutes())

module.exports = () => router.routes();
