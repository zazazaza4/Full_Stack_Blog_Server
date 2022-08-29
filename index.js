import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoute from './routes/auth.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

//Middleware
app.use(express.json());
app.use(cors());

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

app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
