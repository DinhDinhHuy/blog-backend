// const sql = require('mssql');

// const config = {
//     server: process.env.DB_SERVER,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     port: 1433,
//     options: {
//         trustServerCertificate: true
//     }
// };

// const pool = new sql.ConnectionPool(config).connect().then(pool => {
//     console.log('Đã kết nối SQL Server');
//     return pool;
// }).catch(err => {
//     console.error('Lỗi kết nối SQL Server:', err);
//     throw err;
// });


// module.exports = { sql, pool };


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog', 'postgres', 'huyintern',{
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
})
async function testDB() {
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('Kết nối database thành công!');
} catch (error) {
  console.error('Lỗi kết nối', error);
}
}
testDB();

module.exports = sequelize;