import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from '@apkmstickets/common';

import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '@/nats-wrapper';
import { Ticket } from '@/models/ticket';

const setup = async () => {
    // create listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create and save a ticket
    const ticket = await global.buildTicket();

    // create a fake data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 919,
        userId: 'fakeID'
    };

    // create a fake message object
    const msg: Message = {
        ack: jest.fn()
    } as unknown as Message;

    return { listener, data, ticket, msg };
};

it('finds, updates, and saves a ticket', async () => {
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});