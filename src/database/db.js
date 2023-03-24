import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.PORT
};


export const db = new Pool(configDatabase);