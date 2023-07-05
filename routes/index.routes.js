const Router = require("@koa/router");
const clientRoutes = require("./client.routes");

const router = Router();

router.use(["/api/client", "/api/user"], clientRoutes());

module.exports = () => router.routes();
