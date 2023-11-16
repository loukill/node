import  express  from "express";
import { getAll, addOnce, gettxtCategory, putOnce } from "../controllers/textCategorie.js";
import { body } from "express-validator";

const router = express.Router();

router.route("/")
.get(getAll)
.post(
    body('title').isLength({min: 5}),
    addOnce
);

router.route("/:id")
.get(gettxtCategory)
.put(
    body('title').isLength({min: 5}),
    putOnce
);

export default router;