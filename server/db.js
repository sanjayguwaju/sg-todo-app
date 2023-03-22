// const {} = require('pg').Pool
require('dotenv').config()


// const pool = new Pool({
//     user: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     host: process.env.HOST,
//     port: process.env.DBPORT,
//     database: 'todoapp'
// })

// I have connected it with connected string which is more easier way to connect with local and cloud based Postgres Database

const { Pool } = require('pg')
const connectionString = "postgres://postgres:root@localhost:5432/todoapp?schema=public"

const pool = new Pool({
    connectionString,
})
module.exports = pool