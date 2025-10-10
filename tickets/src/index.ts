import mongoose from 'mongoose';

import { app } from './app';
import { DatabaseConnectionError } from '@apkmstickets/common';

async function start () {
  try {
    if (!process.env.JWT_KEY) throw new Error('Invalid JWT');
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
    
    await mongoose.connect(process.env.MONGO_URI);
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