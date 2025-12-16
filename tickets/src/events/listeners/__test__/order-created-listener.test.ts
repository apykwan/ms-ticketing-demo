import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@apkmstickets/common';

import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '@/nats-wrapper';
import { Ticket } from '@/models/ticket';


const setup = async () => {
    // Create an instance of the listener 
    const listener = new OrderCreatedListener(natsWrapper.client);

    // Create and save a ticket
    const ticket = await global.buildTicket();

    // Create the fake data event
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'testUser-123',
        expiresAt: 'never-expired',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, ticket, data, msg };
};

it('sets the userId of the ticket', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    console.log('ticket ', ticket)

    expect(updatedTicket!.orderId).toEqual(data.id);
});

it ('acks the message', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});