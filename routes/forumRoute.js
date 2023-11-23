// routes/forumRoute.js
import express from "express";
const router = express.Router();

const forumRoute = (forumController) => {
  router.get("/", forumController.getAllForums);
  router.post("/", forumController.createForum);
  router.get("/:id", forumController.getForumById);
  router.put("/:id", forumController.updateForum);
  router.delete("/:id", forumController.deleteForum);

  return router;
};

export default forumRoute;
