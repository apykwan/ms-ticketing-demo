import { randomUUID } from 'crypto';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { Ticket, TicketDoc } from '@/models/ticket';

declare global {
  var signin: () => string[];
  var buildTicket: () => Promise<TicketDoc>;
}

jest.mock('../nats-wrapper');

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'adfadsf';
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  jest.clearAllMocks();

  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const payload = {
        id,
        email: `${id}@testemail.com`
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`session=${base64}`];
}

global.buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });

    await ticket.save();

    return ticket;
}