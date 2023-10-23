import pg from "pg"
import { PGCONFIG } from "./config.js"
const { Pool } = pg

const pool = new Pool(PGCONFIG)
export default pool