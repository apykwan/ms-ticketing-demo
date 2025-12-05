import { Publisher, OrderCancelledEvent, Subjects } from '@apkmstickets/common';

export class OrderCabcelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}