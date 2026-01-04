import { Subjects, Publisher, PaymentCreatedEvent } from '@apkmstickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

    onMessage () {
        
    }
}