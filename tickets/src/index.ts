import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@apkmstickets/common';

import { app } from './app';
import { natsWrapper } from '@/nats-wrapper';

async function start () {
  try {
    if (!process.env.JWT_KEY) throw new Error('Invalid JWT');
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
    
    await natsWrapper.connect('ticketing', 'adsf', 'http://nats-srv:4222');
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