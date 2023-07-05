const pool = require("../config/db");
const addAdmin = async (ctx) => {
  try {
    const {
      admin_name,
      admin_photo_number,
      admin_hashed_password,
      admin_is_active,
      admin_is_creater,
    } = ctx.request.body;

    const newAdmin = await pool.query(
      `
        INSERT INTO admin (admin_name,admin_photo_number, admin_hashed_password,admin_is_active,admin_is_creater)
        values($1, $2, $3, $4, $5) RETURNING *
        `,
      [
        admin_name,
        admin_photo_number,
        admin_hashed_password,
        admin_is_active,
        admin_is_creater
      ]
    );
    console.log(newAdmin);
    ctx.status = 200;
    ctx.body = newAdmin.rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
    console.log(error);
  }
};

const getAdmin = async (ctx) => {
  try {
    const admin = await pool.query(`select * from admin`);
    ctx.status = 200;
    ctx.body = admin.rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
  }
};

const deleteAdmin = async (ctx) => {
  try {
    const id = ctx.params.id;
    const admin = await pool.query(
      `DELETE FROM admin WHERE id = $1`,
      [id]
    );
    ctx.status = 200;
    ctx.body = "Successfully deleted";
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Serverda xatolik";
  }
};

const updateAdmin = async (ctx) => {
  try {
    const id = ctx.params.id;
    const {
      admin_name,
      admin_photo_number,
      admin_hashed_password,
      admin_is_active,
      admin_is_creater
    } = ctx.request.body;

    const newAdmin = await pool.query(
      `
        UPDATE admin set admin_name = $1,admin_photo_number = $2,admin_hashed_password = $3,admin_is_active = $4, admin_is_creater = $5
            WHERE id = $6
            RETURNING *
        `,
      [
        admin_name,
        admin_photo_number,
        admin_hashed_password,
        admin_is_active,
        admin_is_creater,
        id,
      ]
    );
    ctx.status = 200;
    ctx.body = newAdmin.rows;;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Severda xatolik"
    console.log(error);
  }
};

module.exports = {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
