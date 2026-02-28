const CommentModel = require("../models/comment.model");

const CommentService = {
    create: async (data, user_id) => {
        if (!data.content || !data.post_id) {
            throw new Error("Thiếu nội dung hoặc post_id");
        }

        await CommentModel.create({
            content: data.content,
            post_id: data.post_id,
            user_id
        });

        return { message: "Bình luận thành công" };
    },

    getByPostId: async (post_id) => {
        return await CommentModel.getByPostId(post_id);
    },

    delete: async (id) => {
        await CommentModel.delete(id);
        return { message: "Xóa bình luận thành công" };
    }
};

module.exports = CommentService;