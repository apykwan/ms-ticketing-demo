import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@apkmstickets/common';

import { queueGroupName } from './queue-group-name';
import { Ticket } from '@/models/ticket';
import { TicketUpdatedPublisher } from '@/events/publishers/ticket-updated-publisher';
import { natsWrapper } from '@/nats-wrapper';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // If no ticket, throw error
        if (!ticket) throw new Error('Ticket Not found');

        // mark the ticket as being reserved by setting its orderId property
        ticket.set({ orderId: data.id });

        // Save the ticket
        await ticket.save();

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version
        });

        // ack the message
        msg.ack();
    }
}