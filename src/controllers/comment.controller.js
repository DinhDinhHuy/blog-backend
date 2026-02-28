const CommentService = require("../services/comment.services");

const CommentController = {
    create: async (req, res) => {
        try {
            const user_id = req.user.user_id;
            const result = await CommentService.create(req.body, user_id);

            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getByPostId: async (req, res) => {
        try {
            const post_id = req.params.post_id;
            const comments = await CommentService.getByPostId(post_id);
            res.json(comments);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await CommentService.delete(id);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = CommentController;