import { Message } from 'node-nats-streaming';
import { ExpirationCompleteEvent, OrderStatus } from '@apkmstickets/common';

import { natsWrapper } from '@/nats-wrapper';
import { Order } from '@/models/order';
import { Ticket } from '@/models/ticket';
import { ExpirationCompleteListener } from '../expiration-complete-listener';

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = await global.buildTicket();
    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'fake_id',
        expiresAt: new Date(),
        ticket
    });
    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id,
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, order, ticket, data, msg };
};

it ('updates the order status to cancelled', async () => {
    const { listener, order, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);

});

it ('emit an OrderCancelled event', async () => {
    const { listener, order, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const mockData = (natsWrapper.client.publish as jest.Mock).mock.calls[0][1];
    const eventData = JSON.parse(mockData);

    expect(eventData.id).toEqual(order.id);
});

it ('ack the message', async () => {
    const { listener, order, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});