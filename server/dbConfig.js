import * as dotenv from "dotenv";
import * as pg from "pg";
/* import Sequelize from "sequelize"; */
dotenv.config({ path: "./.env.local" });
const connectionString = process.env.ELEPHANT;

// this is connecting postgress database with our backend
const { Pool } = pg.default;

const pool = new Pool({
  connectionString,
})

/* dotenv.config({ path: "./.env.local" });

const { Pool } = pg.default;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
}); */

export default pool;
