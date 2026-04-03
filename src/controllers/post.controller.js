const PostService = require("../services/post.services");

const PostController = {
    getAll: async (req, res) => {
        try{
            const posts = await PostService.getAll();
            res.json(posts);
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }, 

    create: async (req, res) => {
        try {
            const user_id = req.user.user_id; 
            const result = await PostService.create(req.body, user_id);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const result = await PostService.update(req.params.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const result = await PostService.delete(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = PostController;