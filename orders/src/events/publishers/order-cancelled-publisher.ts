import { Publisher, OrderCancelledEvent, Subjects } from '@apkmstickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}