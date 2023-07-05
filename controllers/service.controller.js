const pool = require("../config/db");
const addService = async (ctx) => {
  try {
    const { service_name, service_price } = ctx.request.body;

    const newService = await pool.query(
      `
        INSERT INTO service (service_name, service_price)
        values($1, $2) RETURNING *
        `,
      [service_name, service_price]
    );
    console.log(newService);
    ctx.status = 200;
    ctx.body = newService.rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
    console.log(error);
  }
};

const getService = async (ctx) => {
  try {
    const services = await pool.query(`select * from service`);
    ctx.status = 200;
    ctx.body = services.rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
  }
};

const deleteService = async (ctx) => {
  try {
    const id = ctx.params.id;
    const services = await pool.query(`DELETE FROM service WHERE id = $1`, [id]);
    ctx.status = 200;
    ctx.body = "Service successfuly deleted";
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
  }
};

const updateService = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { service_name, service_price } = ctx.request.body;

    const newService = await pool.query(
      `
        UPDATE service set service_name = $1, service_price = $2
        WHERE id = $3
            RETURNING *
        `,
      [service_name, service_price, id]
    );
    ctx.status = 200;
    ctx.body = newService.rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
    console.log(error);
  }
};

module.exports = {
  addService,
  getService,
  updateService,
  deleteService,
};
