import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { notFoundError, errorHandler } from './middelwares/error-handler.js';


import userRoutes from './routes/user.js';
import categoryRoute from "./routes/categories.js";
import txtCategoryRoute from "./routes/textCategorie.js";
import textRoute from "./routes/text.js";
import jeuRoutes from "./routes/jeu.js";
import scoreRoute from "./routes/score.js";
import productRoute from './routes/product.js'
import articalsRoute from './routes/artical.js'
import forumRoute from "./routes/forumRoute.js";
import * as forumController from "./controllers/forumController.js";


const app = express();
const port = process.env.PORT || 3000;
const databaseName = 'dyslire';
const db_url = process.env.DB_URL || `mongodb://127.0.0.1:27017/${databaseName}`;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// Connect to the database
mongoose
  .connect(db_url)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });



app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/img', express.static('public/images'));


app.use('/user', userRoutes);
app.use('/category', categoryRoute);
app.use('/txtCategory', txtCategoryRoute);
app.use('/text', textRoute)
app.use('/score', scoreRoute);
app.use('/api/jeu', jeuRoutes);
app.use('/score', scoreRoute);
app.use("/", productRoute);
app.use("/", articalsRoute);
app.use('/forums', forumRoute);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
