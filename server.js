import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import categoryRoute from "./routes/categories.js";
import txtCategoryRoute from "./routes/textCategorie.js";
import textRoute from "./routes/text.js";
import jeuRoutes from "./routes/jeu.js"

const app = express();
const port = process.env.PORT || 3000
const databaseName = 'category'

mongoose.set('debug', true)
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost:27017/${databaseName}`)
.then(() => {
    console.log(`connected to ${databaseName}`)
})
.catch(err => {
    console.log(err)
})


app.use('/category', categoryRoute);
app.use('/txtCategory', txtCategoryRoute);
app.use('/text', textRoute)
app.use('/api/jeu', jeuRoutes);

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})