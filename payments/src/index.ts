import 'dotenv/config';
import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@apkmstickets/common';

import { app } from './app';
import { natsWrapper } from '@/nats-wrapper';
import { OrderCancelledListener } from '@/events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from '@/events/listeners/order-created-listener';

async function start () {
  try {
    if (!process.env.JWT_KEY) throw new Error('Invalid JWT');
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
    if (!process.env.NATS_CLIENT_ID) throw new Error('NATS_CLIENT_ID must be defined');
    if (!process.env.NATS_URL) throw new Error('NATS_URL must be defined');
    if (!process.env.NATS_CLUSTER_ID) throw new Error('NATS_CLUSTER_ID must be defined');

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
        console.log('NATS connectino closed');
        process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    app.listen(3000, async () => {
      console.log('Listening on port 3000');
    });
  } catch (err) {
    console.log(err);
    throw new DatabaseConnectionError();
  }
}

start();