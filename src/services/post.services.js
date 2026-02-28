const PostModel = require("../models/post.model");

const PostService = {
    getAll: async () => {
        return await PostModel.getAll();
    },

    create: async (data, user_id) => {
        if (!data.title || !data.content) {
            throw new Error("Thiếu dữ liệu");
        }
        await PostModel.create({title: data.title, content: data.content, user_id});
        return { message: "Tạo bài viết thành công" };
    },
    
    update: async (id, data) => {
        await PostModel.update(id, data);
        return { message: "Cập nhật thành công" };
    },

    delete: async (id) => {
        await PostModel.delete(id);
        return { message: "Xóa thành công" };
    }
};

module.exports = PostService;