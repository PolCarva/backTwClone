const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "socialMedia",
    password: "Marruecos02",
    port: 5432,
});
module.exports = client

