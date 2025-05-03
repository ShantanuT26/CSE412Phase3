// db/pool.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(); // auto-reads from .env

module.exports = pool;
