import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

app.use('/', (req, res) => {
  console.log('Hellow world ');
});

app.listen(5000, () => {
  console.log('server is working');
});
