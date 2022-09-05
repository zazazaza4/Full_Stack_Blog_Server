import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import postsRoute from './routes/posts.js';
import categoriesRoute from './routes/categories.js';
import commetsRoute from './routes/comments.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/comments', commetsRoute);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
