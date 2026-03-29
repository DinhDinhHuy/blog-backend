const Post = require("../models/post.model");

const PostService = {
    getAll: async () => {
        return await Post.getAll();
    },

    create: async (data, user_id) => {
        if (!data.title || !data.content) {
            throw new Error("Thiếu dữ liệu");
        }
        await Post.create({title: data.title, content: data.content, user_id});
        return { message: "Tạo bài viết thành công" };
    },
    
    update: async (id, data) => {
        const checkPost = await Post.findByPk(id);
        if(!checkPost){
            throw new Error("Bài viết không tồn tại!")
        }
        await Post.update(id, data);
        return { message: "Cập nhật thành công" };
    },

    delete: async (id) => {
        const checkPost = await Post.findByPk(id);
        if(!checkPost){
            throw new Error("Bài viết không tồn tại!")
        }
        await Post.destroy(id);
        return { message: "Xóa thành công" };
    }
};

module.exports = PostService;