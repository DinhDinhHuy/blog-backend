// const { sql, pool } = require("../config/db");

// const CommentModel = {
//     create: async (comment) => {
//         const conn = await pool;
//         await conn.request()
//             .input("content", sql.NVarChar, comment.content)
//             .input("user_id", sql.Int, comment.user_id)
//             .input("post_id", sql.Int, comment.post_id)
//             .query(`INSERT INTO comments (content, user_id, post_id, created_at) VALUES (@content, @user_id, @post_id, GETDATE())`);
//     },

//     getByPostId: async (post_id) => {
//         const conn = await pool;
//         const result = await conn.request()
//             .input("post_id", sql.Int, post_id)
//             .query(`
//                 SELECT c.id, c.content, c.created_at, u.username 
//                 FROM comments c JOIN users u 
//                 ON c.user_id = u.id
//                 WHERE c.post_id = @post_id`);
//         return result.recordset;
//     },

//     delete: async (id) => {
//         const conn = await pool;
//         await conn.request()
//             .input("id", sql.Int, id)
//             .query("DELETE FROM comments WHERE id = @id");
//     }
// };

// module.exports = CommentModel;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Comment;