import request from 'supertest';

import { app } from '@/app';
import { Order, OrderStatus } from '@/models/order';
import { natsWrapper } from '@/nats-wrapper';

it('marks an order as cancelled', async () => {
    // create a ticket 
    const ticket = await global.buildTicket();
    const user = global.signin(); 

    // make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    // make a request ot cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    // ensure order get cancelled
    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
    // create a ticket 
    const ticket = await global.buildTicket();
    const user = global.signin(); 

    // make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    // make a request ot cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});