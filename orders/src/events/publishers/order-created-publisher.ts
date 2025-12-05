import { Publisher, OrderCreatedEvent, Subjects } from '@apkmstickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}