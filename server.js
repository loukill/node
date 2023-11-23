import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import forumRoute from "./routes/forumRoute.js";
import * as forumController from "./controllers/forumController.js";
import { errorHandler, notFoundError } from "./middlewares/error-handler.js";

const app = express();
const port = process.env.PORT || 3000;
const databaseName = 'category';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
        console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
        console.log(err);
    });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/img', express.static('public/images'));

app.use('/forums', forumRoute(forumController));

// Middleware pour gérer les erreurs 404
app.use(notFoundError);

// Middleware pour gérer les erreurs génériques
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
