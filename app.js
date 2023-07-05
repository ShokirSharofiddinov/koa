const Koa = require("koa");
const config = require("config");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");

const router = require("./routes/index.routes");

const PORT = config.get("port");

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(serve(".")); //hamma file ni ochishga ruhsat beradi

app.use(router());

// //context => ctx

// app.use((ctx) => {
// //   console.log(ctx);
// //   console.log(ctx.req);
//     ctx.body = "HI KOA"
// });

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch {
    console.log(error);
  }
};
start();
