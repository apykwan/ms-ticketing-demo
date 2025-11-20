import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '@/app';

it('return an error if the ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', await global.signin())
        .send({ ticketId })
        .expect(404);
});


it('return an error if the ticket is already reserved', async () => {

});

it('reserves a ticket', async () => {

});