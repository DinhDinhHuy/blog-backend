// const { sql, pool } = require("../config/db")

// const UserModel = {
//     create: async (user) => {
//         const conn = await pool;
//         await conn.request()
//             .input("username", sql.VarChar, user.username)
//             .input("password", sql.VarChar, user.password)
//             .input("email", sql.VarChar, user.email)
//             .query(`INSERT INTO users(username, email, password, created_at) VALUES (@username, @email, @password, GETDATE())`);
//     },

//     findByEmail: async (email) => {
//         const conn = await pool;
//         const result = await conn.request()
//             .input("email", sql.VarChar, email)
//             .query(`SELECT * FROM users WHERE @email = email`);

//         return result.recordset[0];
//     }
// }
// module.exports = UserModel;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = User;