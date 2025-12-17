import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCancelledEvent, OrderStatus } from '@apkmstickets/common';

import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '@/nats-wrapper';
import { Ticket } from '@/models/ticket';

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    // Create and save a ticket
    const ticket = await global.buildTicket();
    
    const orderId = new mongoose.Types.ObjectId().toHexString();
    ticket.set({ orderId });

    // Create the fake data event
    const data: OrderCancelledEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        ticket: {
            id: ticket.id,
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, ticket, data, msg, orderId };
}

it('updates the ticket, publishes an event, and acks the message', async () => {
    const { msg, data, ticket, orderId, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket?.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});