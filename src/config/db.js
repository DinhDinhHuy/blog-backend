const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config).connect().then(pool => {
    console.log('Đã kết nối SQL Server');
    return pool;
}).catch(err => {
    console.error('Lỗi kết nối SQL Server:', err);
    throw err;
});


module.exports = { sql, pool };
