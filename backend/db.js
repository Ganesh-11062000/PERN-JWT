const Pool = require('pg').Pool;
const pool = new Pool({
    user:'postgres',
    password:'P@ssword@123',
    host:'localhost',
    port:5432,
    database:'jwt_pern_tutorial'
});

module.exports = pool;