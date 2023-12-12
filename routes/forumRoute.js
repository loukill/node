// routes/forumRoute.js
import express from "express";
import multer from "../middlewares/multer-config-forum.js";
import{ body } from "express-validator";


const router = express.Router();

const forumRoute = (forumController) => {
  router.get("/", forumController.getAllForums);
  router.post("/",multer,[body("title").isString(),body("description").isString()], forumController.addOnce);
  router.get("/:id", forumController.getForumById);
  router.put("/:id", forumController.updateForum);
  router.delete("/:id", forumController.deleteForum);

  return router;
};

export default forumRoute;
