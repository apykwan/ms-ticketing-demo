import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { app } from '../app';

beforeAll(async() => {
  const mongo = new MongoMemoryServer();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async() => {
  const collections = await mongoose.connection.db?.collections();
});