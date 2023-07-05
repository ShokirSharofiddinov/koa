const pool = require("../config/db");
const DeviceDetector = require("node-device-detector");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
});

const addClient = async (ctx) => {
  try {
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = ctx.request.body;

    const newClient = await pool.query(
      `
        INSERT INTO client (client_last_name,client_first_name,
            client_phone_number,client_info,client_photo)
            values($1, $2, $3, $4, $5) RETURNING *
        `,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
      ]
    );
    // console.log(newClient);
    ctx.status = 200;
    ctx.body = newClient.rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
    console.log(error);
  }
};

const getClient = async (ctx) => {
  try {
    const clients = await pool.query(`select * from client`);
    console.log(clients);
    ctx.status = 200;
    ctx.body = clients;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
    console.log(error);
  }
};

const deleteClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    const clients = await pool.query(`DELETE FROM client WHERE id = $1`, [id]);
    ctx.status = 200;
    ctx.body = "Successfully deleted";
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
  }
};

const updateClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = ctx.request.body;

    const newClient = await pool.query(
      `
        UPDATE client set client_last_name = $1, client_first_name = $2,
            client_phone_number = $3,client_info = $4, client_photo = $5
            WHERE id = $6
            RETURNING *
        `,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
        id,
      ]
    );
    ctx.status = 200;
    ctx.body = newClient.rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
    console.log(error);
  }
};

module.exports = {
  addClient,
  getClient,
  updateClient,
  deleteClient,
};
