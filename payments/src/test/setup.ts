import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
// import { OrderStatus } from '@apkmstickets/common';

// import { Order, OrderDoc } from '@/models/order';

declare global {
  var signin: () => string[];
  // var buildOrder: () => Promise<OrderDoc>;
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
  // Build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and ecode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that the cookie with the encoded data
  return [`session=${base64}`];
}

// global.buildOrder = async () => {
//     const order = Order.build({
//         version: 0,
//         userId: 'some-user',
//         status: OrderStatus.Created,
//         ticket: {
//             id: 'some-id',
//             price: 10
//         }
//     });

//     await order.save();

//     return order;
// }