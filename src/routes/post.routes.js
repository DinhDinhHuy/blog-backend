const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create",authMiddleware, PostController.create);
router.get("/getAll", PostController.getAll);
router.put("/:id", authMiddleware, PostController.update);
router.delete("/:id", authMiddleware, PostController.delete);

module.exports = router;