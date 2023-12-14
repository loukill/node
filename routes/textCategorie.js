import  express  from "express";
import { getAll, addOnce, getTxtCategory, putOnce, deleteTxtCategory } from "../controllers/textCategorie.js";
import { body } from "express-validator";

const router = express.Router();

router.route("/")
.get(getAll)
.post(
    body('title').isLength({min: 1}),
    addOnce
);

router.route("/:id")
.get(getTxtCategory)
.put(
    body('title').isLength({min: 1}),
    putOnce,
)
.delete(deleteTxtCategory)

export default router;