import  express  from "express";
import { getAll, addOnce, getTxtCategory, putOnce, deleteTxtCategory, enregistrerConsultation } from "../controllers/textCategorie.js";
import { body } from "express-validator";
import TextCategory from "../models/textCategorie.js";

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

router.route("/:txtCategoryId/consulter")
.post(enregistrerConsultation)

// Dans votre fichier de routes (par exemple, routes.js)

router.get('/test/txtCategory/:txtCategoryId', async (req, res) => {
    try {
        const txtCategoryId = req.params.txtCategoryId;
        console.log("Testing txtCategoryId:", txtCategoryId);

        const textCategory = await TextCategory.findById(txtCategoryId);
        if (!textCategory) {
            return res.status(404).json({ message: 'Catégorie de texte non trouvée pour le test.' });
        }

        res.status(200).json(textCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;