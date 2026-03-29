// const { sql, pool } = require("../config/db")

// const PostModel = {
//     getAll: async () => {
//         const conn = await pool;
//         const result = await conn.request()
//             .query(`SELECT * FROM posts ORDER BY created_at DESC`)
//         return result.recordset;
//     },

//     create: async (post) => {
//         const conn = await pool;
//         await conn.request()
//             .input("title", sql.VarChar, post.title)
//             .input("content", sql.Text, post.content)
//             .input("user_id", sql.Int, post.user_id)
//             .query(`INSERT INTO posts (title, content, user_id, created_at) VALUES (@title, @content, @user_id, GETDATE())`);
//     },

//      update: async (id, data) => {
//         const conn = await pool;
//         await conn.request()
//             .input("id", sql.Int, id)
//             .input("title", sql.NVarChar, data.title)
//             .input("content", sql.NVarChar, data.content)
//             .query(`UPDATE posts SET title = @title, content = @content WHERE id = @id`);
//     },

//     delete: async (id) => {
//         const conn = await pool;
//         await conn.request()
//             .input("id", sql.Int, id)
//             .query("DELETE FROM posts WHERE id = @id");
//     }
// }

// module.exports = PostModel;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Post;