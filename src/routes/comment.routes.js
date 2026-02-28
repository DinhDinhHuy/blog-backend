const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, CommentController.create);
router.get("/:post_id", CommentController.getByPostId);
router.delete("/:id", authMiddleware, CommentController.delete);

module.exports = router;