import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import postsRoute from './routes/posts.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

mongoose
  .connect(
    'mongodb+srv://lama:1234567890@cluster0.oslpx.mongodb.net/blog?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
// app.use('/comments', authRoute);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
