import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const testconnection = async () => {
  try {
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
    console.error(error.message);
  }
};

testconnection();

export default pool;
