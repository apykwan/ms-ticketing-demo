import mongoose from 'mongoose';

import { app } from './app';
import {  DatabaseConnectionError } from '@apkmstickets/common';

async function start () {
  try {
    if (!process.env.JWT_KEY) throw new Error('Invalid JWT');
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
    throw new DatabaseConnectionError();
  }
}

app.listen(3000, async () => {
  await start();
  console.log('Listening on port 3000');
});